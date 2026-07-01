import { PITCH_TEMPLATES } from "../data/pitches.js";
import { NEWS_BANK } from "../data/news.js";
import { rollHoldingOutcome } from "./outcomeRoll.js";

/**
 * Shuffles an array helper.
 */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Rolls a single pitch instance from a template.
 */
export function rollPitchInstance(template) {
  // 1. Roll traits
  const { possibleTraitPool, traitCountRange, baseAsk, baseValuation, baseOutcomeWeights, outcomeWeightVariance } = template;
  const minTraits = traitCountRange[0];
  const maxTraits = traitCountRange[1];
  const count = Math.floor(Math.random() * (maxTraits - minTraits + 1)) + minTraits;

  const shuffledTraits = shuffle(possibleTraitPool);
  const selectedTraits = shuffledTraits.slice(0, count);

  // 2. Jitter ask and valuation (+/- 10%)
  const askJitter = 0.9 + Math.random() * 0.2;
  const valuationJitter = 0.9 + Math.random() * 0.2;
  const ask = Math.round((baseAsk * askJitter) / 10000) * 10000;
  const valuation = Math.round((baseValuation * valuationJitter) / 50000) * 50000;

  // 3. Jitter outcome weights
  const weightJitter = () => (Math.random() * 2 - 1) * outcomeWeightVariance;
  let growth = Math.max(0, baseOutcomeWeights.growth + weightJitter());
  let decline = Math.max(0, baseOutcomeWeights.decline + weightJitter());
  let volatile = Math.max(0, baseOutcomeWeights.volatile + weightJitter());

  const total = growth + decline + volatile;
  if (total > 0) {
    growth /= total;
    decline /= total;
    volatile /= total;
  } else {
    growth = 0.4;
    decline = 0.3;
    volatile = 0.3;
  }

  return {
    id: template.id,
    instanceId: `${template.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    businessName: template.businessName,
    industry: template.industry,
    archetype: template.archetype,
    pitchSummary: template.pitchSummary,
    ask,
    valuation,
    traits: selectedTraits,
    outcomeWeights: { growth, decline, volatile }
  };
}

/**
 * Generates active pitches for the current turn.
 */
export function generatePitchesForTurn(industry, count = 3) {
  const filtered = PITCH_TEMPLATES.filter(p => p.industry === industry);
  const shuffled = shuffle(filtered);
  const selectedTemplates = shuffled.slice(0, Math.min(count, shuffled.length));

  return selectedTemplates.map(template => rollPitchInstance(template));
}

/**
 * Gets news items for the current turn.
 */
export function getNewsForTurn(turn, industry) {
  return NEWS_BANK.filter(news => {
    if (news.turn !== turn) return false;
    if (news.scope === "industry" && news.industry !== industry) return false;
    return true;
  });
}

/**
 * Resolves all end-of-turn calculations and returns the updated state values.
 * @param {Object} state - The current Zustand state
 * @param {number} operatingCost - The operating cost deducted each turn (default $50,000)
 */
export function resolveTurn(state, operatingCost = 50000) {
  let nextCash = state.cash;
  let nextPortfolio = [...state.portfolio];

  // 1. Resolve pending exits
  nextPortfolio = nextPortfolio.map(holding => {
    if (holding.status === "exit_pending") {
      const exitValue = Math.round(holding.investedAmount * holding.currentValueMultiplier);
      nextCash += exitValue;
      return {
        ...holding,
        status: "exited",
        exitValue
      };
    }
    return holding;
  });

  // 2. Roll outcomes for active holdings
  nextPortfolio = nextPortfolio.map(holding => {
    if (holding.status === "active") {
      const { outcomeType, multiplier, newValueMultiplier, isFailed } = rollHoldingOutcome(holding);
      const prevValue = Math.round(holding.investedAmount * holding.currentValueMultiplier);
      const nextValue = Math.round(holding.investedAmount * newValueMultiplier);

      const historyLog = {
        turn: state.turn,
        outcomeType,
        multiplier,
        value: nextValue,
        changePercent: Math.round((multiplier - 1) * 100)
      };

      return {
        ...holding,
        currentValueMultiplier: newValueMultiplier,
        turnsHeld: holding.turnsHeld + 1,
        status: isFailed ? "failed" : "active",
        history: [...(holding.history || []), historyLog]
      };
    }
    return holding;
  });

  // 3. Deduct operating cost
  nextCash -= operatingCost;

  // 4. Calculate Net Worth
  // Net Worth = Spendable Cash + Current Value of all Active / Pending holdings
  const activeHoldingsValue = nextPortfolio
    .filter(h => h.status === "active" || h.status === "exit_pending")
    .reduce((sum, h) => sum + Math.round(h.investedAmount * h.currentValueMultiplier), 0);

  const nextNetWorth = Math.max(0, nextCash + activeHoldingsValue);
  const nextNetWorthHistory = [...state.netWorthHistory, nextNetWorth];

  // 5. Game Over / Bankruptcy check
  let nextGameOver = state.gameOver;
  if (nextNetWorth <= 0) {
    nextGameOver = true;
    nextCash = 0;
  }

  // 6. Advance turn number
  const nextTurn = state.turn + 1;
  const isDemoFinished = nextTurn > 52; // Max turn limit of 52

  // 7. Generate next turn's news and pitches (if game is not over)
  let nextPitches = [];
  let nextNews = [];

  if (!nextGameOver && !isDemoFinished) {
    nextPitches = generatePitchesForTurn(state.industry, 3);
    nextNews = getNewsForTurn(nextTurn, state.industry);
  }

  return {
    turn: nextTurn,
    cash: nextCash,
    netWorthHistory: nextNetWorthHistory,
    portfolio: nextPortfolio,
    currentPitches: nextPitches,
    currentNews: nextNews,
    gameOver: nextGameOver,
    demoFinished: isDemoFinished,
    points: {
      available: state.points.max,
      max: state.points.max
    },
    diligenceLog: {}
  };
}
