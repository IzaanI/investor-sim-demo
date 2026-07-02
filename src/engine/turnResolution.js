import { PITCH_TEMPLATES } from "../data/pitches.js";
import { NEWS_BANK } from "../data/news.js";
import { rollHoldingOutcome } from "./outcomeRoll.js";
import { TRAITS } from "../data/traits.js";
import { EVENT_TEMPLATES } from "../data/events.js";
import { ARCHETYPES } from "../data/archetypes.js";
import { SEGMENTS } from "../data/segments.js";

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
 * Interpolates {{placeholder}} tokens in a segment text string.
 */
function interpolate(text, vars) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`);
}

/**
 * Generates random runtime metric strings for traction segments.
 */
function generateRuntimeMetrics() {
  const users = Math.round((500 + Math.random() * 49500) / 100) * 100;
  const mrr = Math.round((2000 + Math.random() * 48000) / 500) * 500;
  const growth = (5 + Math.random() * 40).toFixed(0);
  return {
    metric: `${users.toLocaleString()} active users`,
    revenueStr: `$${(mrr / 1000).toFixed(0)}k MRR`,
    growthStr: `${growth}% month-over-month`
  };
}

/**
 * Assembles a pitch from the segment pool using the template's archetype.
 * Returns an array of 5 interpolated paragraph strings (one per slot).
 */
function assemblePitch(template, businessName, archetypeKey) {
  const slots = ["intro", "body", "close"];
  const allowedTones = ARCHETYPES[archetypeKey]?.tones || [];
  const metrics = generateRuntimeMetrics();

  const vars = {
    companyName: businessName,
    product: template.product,
    market: template.market,
    painPoint: template.painPoint,
    customerNoun: template.customerNoun,
    ...metrics
  };

  return slots.map(slot => {
    // Filter segments where at least one of the segment's tones is allowed for this archetype
    const pool = (SEGMENTS[slot] || []).filter(s => 
      s.tones && s.tones.some(tone => allowedTones.includes(tone))
    );
    if (pool.length === 0) return "";
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    return interpolate(chosen.text, vars);
  });
}

/**
 * Picks one trait from the archetype's bias list (duplicates act as weight).
 */
function pickTrait(archetypeKey) {
  const archetype = ARCHETYPES[archetypeKey];
  if (!archetype) {
    const fallback = Object.keys(TRAITS);
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  const bias = archetype.traitBias;
  return bias[Math.floor(Math.random() * bias.length)];
}

/**
 * Rolls a single pitch instance from a template using the combinatorial engine.
 */
export function rollPitchInstance(template, netWorth = 1000000) {
  // Select a name at random from the template's possible names
  const nameOptions = template.businessNames || [template.businessName || "Unknown Startup"];
  const businessName = nameOptions[Math.floor(Math.random() * nameOptions.length)];

  // Pick a random founder archetype key
  const archetypeKeys = Object.keys(ARCHETYPES);
  const selectedArchetypeKey = archetypeKeys[Math.floor(Math.random() * archetypeKeys.length)];

  // 1. Assemble pitch paragraphs using the dynamic name and archetype key
  const assembledParagraphs = assemblePitch(template, businessName, selectedArchetypeKey);

  // 2. Pick one trait weighted by the selected archetype bias
  const traitId = pickTrait(selectedArchetypeKey);

  // 3. Random ask $50k–$500k (nearest $5k)
  const askRaw = 50000 + Math.random() * 450000;
  const ask = Math.round(askRaw / 5000) * 5000;

  // 4. Valuation 5–15× ask (nearest $25k)
  const multiplier = 5 + Math.random() * 10;
  const valuation = Math.round((ask * multiplier) / 25000) * 25000;

  // 5. Outcome weights from trait nudge
  const baseWeights = { growth: 0.5, decline: 0.4, volatile: 0.1 };
  const nudges = TRAITS[traitId]?.outcomeNudge || {};
  const g = Math.max(0, baseWeights.growth + (nudges.growth || 0));
  const d = Math.max(0, baseWeights.decline + (nudges.decline || 0));
  const v = Math.max(0, baseWeights.volatile + (nudges.volatile || 0));
  const total = g + d + v;
  const normalized = total > 0
    ? { growth: g / total, decline: d / total, volatile: v / total }
    : baseWeights;

  return {
    id: template.id,
    instanceId: `${template.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    businessName,
    industry: template.industry,
    archetypeKey: selectedArchetypeKey,
    archetypeLabel: ARCHETYPES[selectedArchetypeKey]?.label ?? selectedArchetypeKey,
    assembledParagraphs,
    ask,
    valuation,
    trait: traitId,
    outcomeWeights: normalized
  };
}

/**
 * Generates active pitches for the current turn.
 */
export function generatePitchesForTurn(industry, netWorth = 1000000, turnNumber = 1) {
  let count = 3;
  if (turnNumber === 1) {
    count = 1;
  } else if (turnNumber === 2) {
    count = 2;
  } else {
    count = Math.random() < 0.5 ? 2 : 3;
  }

  const filtered = PITCH_TEMPLATES.filter(p => p.industry === industry);
  const shuffled = shuffle(filtered);
  const selectedTemplates = shuffled.slice(0, Math.min(count, shuffled.length));

  return selectedTemplates.map(template => rollPitchInstance(template, netWorth));
}

/**
 * Gets news items for the current turn.
 */
export function getNewsForTurn(turn, industry, activeNewsEffects = []) {
  return NEWS_BANK.filter(news => {
    if (news.turn !== turn) return false;
    if (news.scope === "industry" && news.industry !== industry) return false;
    // Repeats are allowed — do not filter by activeNewsEffects ids
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
      const { outcomeType, multiplier, newValueMultiplier, isFailed } = rollHoldingOutcome(holding, state.activeNewsEffects);
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

  // 2.5 Generate events probabilistically for active holdings
  const nextEventQueue = [];
  nextPortfolio.forEach(holding => {
    // Only roll events for holdings that survived this turn as 'active'
    if (holding.status === "active") {
      const roll = Math.random();
      const eventBaseChance = holding.eventChance?.base || 0.15;
      
      if (roll < eventBaseChance) {
        // Trigger event!
        // Find if company is performing well (multiplier >= 1.0) or declining (< 1.0)
        const isUpTrend = holding.currentValueMultiplier >= 1.0;
        
        // Find templates
        const candidateTemplates = EVENT_TEMPLATES.filter(evt => {
          if (isUpTrend) {
            return evt.triggerCondition === "trend_up" || evt.triggerCondition === "any";
          } else {
            return evt.triggerCondition === "trend_down" || evt.triggerCondition === "any";
          }
        });

        if (candidateTemplates.length > 0) {
          // Select random template
          const template = candidateTemplates[Math.floor(Math.random() * candidateTemplates.length)];
          
          // Calculate values
          let eventAsk = 0;
          let buyoutAmount = 0;
          
          if (template.type === "follow_on_request") {
            eventAsk = Math.round((holding.investedAmount * (0.4 + Math.random() * 0.2)) / 5000) * 5000;
          } else if (template.type === "distress_request") {
            eventAsk = Math.round((holding.investedAmount * (0.2 + Math.random() * 0.1)) / 2500) * 2500;
          } else if (template.type === "buyout_offer") {
            const currentValue = holding.investedAmount * holding.currentValueMultiplier;
            buyoutAmount = Math.round((currentValue * (1.2 + Math.random() * 0.3)) / 10000) * 10000;
          }

          const formatCurrencyStr = (val) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

          // Create event instance
          const eventInstance = {
            id: `${holding.pitchId}_evt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            pitchId: holding.pitchId,
            investedAmount: holding.investedAmount,
            businessName: holding.businessName,
            type: template.type,
            promptText: template.promptText
              .replaceAll("{businessName}", holding.businessName)
              .replaceAll("{eventAsk}", formatCurrencyStr(eventAsk))
              .replaceAll("{buyoutAmount}", formatCurrencyStr(buyoutAmount)),
            eventAsk,
            buyoutAmount,
            options: template.options.map(opt => ({
              ...opt,
              label: opt.label
                .replaceAll("{eventAsk}", formatCurrencyStr(eventAsk))
                .replaceAll("{buyoutAmount}", formatCurrencyStr(buyoutAmount))
            }))
          };
          
          nextEventQueue.push(eventInstance);
        }
      }
    }
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

  // 6.5 Handle active news durations
  let nextActiveNewsEffects = (state.activeNewsEffects || [])
    .map(evt => ({
      ...evt,
      turnsRemaining: evt.turnsRemaining - 1
    }))
    .filter(evt => evt.turnsRemaining > 0);

  // 7. Generate next turn's news and pitches (if game is not over)
  let nextPitches = [];
  let nextNews = [];

  if (!nextGameOver && !isDemoFinished) {
    nextPitches = generatePitchesForTurn(state.industry, nextNetWorth, nextTurn);
    nextNews = getNewsForTurn(nextTurn, state.industry, nextActiveNewsEffects);

    // Register newly triggered persistent news
    nextNews.forEach(newsItem => {
      if (newsItem.duration > 0) {
        nextActiveNewsEffects.push({
          id: newsItem.id,
          headline: newsItem.headline,
          detail: newsItem.detail,
          category: newsItem.category,
          timeString: newsItem.timeString,
          turnsRemaining: newsItem.duration,
          macroModifiers: newsItem.macroModifiers
        });
      }
    });
  }

  return {
    turn: nextTurn,
    cash: nextCash,
    netWorthHistory: nextNetWorthHistory,
    portfolio: nextPortfolio,
    eventQueue: [...(state.eventQueue || []), ...nextEventQueue],
    currentPitches: nextPitches,
    currentNews: nextNews,
    activeNewsEffects: nextActiveNewsEffects,
    gameOver: nextGameOver,
    demoFinished: isDemoFinished,
    diligenceLog: {},
    backgroundChecksRemaining: 1
  };
}
