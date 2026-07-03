import { create } from "zustand";
import { generatePitchesForTurn, getNewsForTurn, resolveTurn } from "../engine/turnResolution";
import { TRAITS } from "../data/traits";

const SAVE_KEY = "investor_game_save_v5";
const SAVE_VERSION = 5;
const INITIAL_CASH = 1000000; // $1,000,000 starting cash
const INDUSTRIES = ["Health & Wellness", "Food & Beverage"];

const createInitialState = () => {
  const chosenIndustry = INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)];
  const drawnSegments = { intro: [], body: [], close: [] };
  const seenTemplates = {};
  
  const initialPitches = generatePitchesForTurn(drawnSegments, seenTemplates, INITIAL_CASH, 1);
  const initialNews = getNewsForTurn(1, []);
  const initialActiveNews = [];
  initialNews.forEach(newsItem => {
    if (newsItem.duration > 0) {
      initialActiveNews.push({
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

  return {
    saveVersion: SAVE_VERSION,
    turn: 1,
    cash: INITIAL_CASH,
    netWorthHistory: [INITIAL_CASH],
    industry: chosenIndustry,
    portfolio: [],
    passedPitches: [],
    pendingOffers: [],
    eventQueue: [],
    // instanceId -> { backgroundChecked: bool, backgroundClue: string|null }
    diligenceLog: {},
    currentPitches: initialPitches,
    currentNews: initialNews,
    gameOver: false,
    demoFinished: false,
    activeNewsEffects: initialActiveNews,
    pinnedNewsIds: [],
    backgroundChecksRemaining: 1,
    drawnSegments,
    seenTemplates
  };
};

export const useGameStore = create((set, get) => ({
  // Raw state
  ...createInitialState(),

  // Actions
  startGame: () => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.saveVersion === SAVE_VERSION) {
          set(parsed);
          return;
        }
      }
    } catch (e) {
      console.error("Failed to load game save", e);
    }
    const freshState = createInitialState();
    set(freshState);
    localStorage.setItem(SAVE_KEY, JSON.stringify(freshState));
  },

  resetGame: () => {
    const freshState = createInitialState();
    set(freshState);
    localStorage.setItem(SAVE_KEY, JSON.stringify(freshState));
  },

  nextTurn: () => {
    const state = get();
    if (state.gameOver || state.demoFinished) return;

    const nextStateValues = resolveTurn(state, 10000); // $10K operating cost per turn
    set(nextStateValues);

    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  },

  conductBackgroundCheck: (pitchInstanceId) => {
    const { cash, diligenceLog, currentPitches, backgroundChecksRemaining } = get();

    if (backgroundChecksRemaining < 1) return; // out of checks for this turn

    const pitch = currentPitches.find(p => p.instanceId === pitchInstanceId);
    if (!pitch) return;

    const currentLog = diligenceLog[pitchInstanceId] || {
      backgroundChecked: false,
      backgroundClue: null,
      coiChecked: false,
      coiWarning: null,
      hasConflict: false
    };

    if (currentLog.backgroundChecked) return; // already run

    // Cost: 8% of ask, rounded to nearest $5k, minimum $10k
    const cost = Math.max(10000, Math.round((pitch.ask * 0.08) / 5000) * 5000);
    if (cash < cost) return; // can't afford it

    // Pick one backgroundClue from the pitch's trait
    const traitDef = TRAITS[pitch.trait];
    const clues = traitDef?.backgroundClue || [];
    const clue = clues.length > 0 && Math.random() < 0.9 // 15% chance of clean check even with traits
      ? clues[Math.floor(Math.random() * clues.length)]
      : "Nothing notable surfaced in the public record.";

    const newLog = {
      ...currentLog,
      backgroundChecked: true,
      backgroundClue: clue
    };

    set({
      cash: cash - cost,
      backgroundChecksRemaining: backgroundChecksRemaining - 1,
      diligenceLog: {
        ...diligenceLog,
        [pitchInstanceId]: newLog
      }
    });

    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  },

  runCOICheck: (pitchInstanceId) => {
    const { portfolio, diligenceLog, currentPitches } = get();
    const pitch = currentPitches.find(p => p.instanceId === pitchInstanceId);
    if (!pitch) return;

    const currentLog = diligenceLog[pitchInstanceId] || {
      backgroundChecked: false,
      backgroundClue: null,
      coiChecked: false,
      coiWarning: null,
      hasConflict: false
    };

    if (currentLog.coiChecked) return;

    const coiCost = 1000;
    if (get().cash < coiCost) return;

    const conflict = portfolio.find(h => h.pitchId === pitch.id && h.status === "active");
    const warning = conflict 
      ? `CONFLICT OF INTEREST DETECTED: You already hold an active investment in ${conflict.businessName}, a direct competitor.`
      : "Clear: No portfolio conflicts found.";

    set({
      cash: get().cash - coiCost,
      diligenceLog: {
        ...diligenceLog,
        [pitchInstanceId]: {
          ...currentLog,
          coiChecked: true,
          coiWarning: warning,
          hasConflict: !!conflict
        }
      }
    });

    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  },



  investInPitch: (pitchInstanceId) => {
    const { cash, currentPitches, portfolio, diligenceLog } = get();
    const pitch = currentPitches.find(p => p.instanceId === pitchInstanceId);
    if (!pitch || cash < pitch.ask) return;

    const equityPercent = Number(((pitch.ask / pitch.valuation) * 100).toFixed(2));
    const logEntry = diligenceLog[pitchInstanceId];

    const hasConflict = portfolio.some(h => h.pitchId === pitch.id && h.status === "active");

    const newHolding = {
      pitchId: pitch.id,
      businessName: pitch.businessName,
      archetypeLabel: pitch.archetypeLabel,
      backgroundChecked: logEntry?.backgroundChecked || false,
      backgroundClue: logEntry?.backgroundClue || null,
      industry: pitch.industry,             // needed for industry-scoped news effects
      investedAmount: pitch.ask,
      equityPercent,
      currentValueMultiplier: 1.0,
      turnsHeld: 0,
      status: "active",
      eventChance: { base: 0.1, trendModifier: 0 },
      trait: pitch.trait,
      outcomeWeights: pitch.outcomeWeights,
      history: [],
      assembledParagraphs: pitch.assembledParagraphs,
      valuationAtInvestment: pitch.valuation,
      capitalContributions: [{ amount: pitch.ask, turn: get().turn, type: "Initial Investment" }],
      coiLawsuitPending: hasConflict,
      lastMilestoneMultiplier: 1.0
    };

    // Remove from current pitches so they can't buy it twice
    const updatedPitches = currentPitches.filter(p => p.instanceId !== pitchInstanceId);

    // Recalculate net worth immediately
    const nextPortfolio = [newHolding, ...portfolio];
    const activeValue = nextPortfolio
      .filter(h => h.status === "active" || h.status === "exit_pending")
      .reduce((sum, h) => sum + Math.round(h.investedAmount * h.currentValueMultiplier), 0);
    
    const nextCash = cash - pitch.ask;
    const nextNetWorth = nextCash + activeValue;
    const nextNetWorthHistory = [...get().netWorthHistory.slice(0, -1), nextNetWorth];

    set({
      cash: nextCash,
      currentPitches: updatedPitches,
      portfolio: nextPortfolio,
      netWorthHistory: nextNetWorthHistory
    });

    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  },

  exitHolding: (pitchId, investedAmount) => {
    const { portfolio } = get();
    // Update the specific holding status to 'exit_pending'
    const updatedPortfolio = portfolio.map(h => {
      // Find the active holding by pitchId and investedAmount (matching index keys)
      if (h.pitchId === pitchId && h.investedAmount === investedAmount && h.status === "active") {
        return {
          ...h,
          status: "exit_pending"
        };
      }
      return h;
    });

    set({ portfolio: updatedPortfolio });
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  },

  dismissPitch: (pitchInstanceId) => {
    const { currentPitches, passedPitches } = get();
    const pitch = currentPitches.find(p => p.instanceId === pitchInstanceId);
    if (!pitch) return;

    const ghostHolding = {
      pitchId: pitch.id,
      businessName: pitch.businessName,
      archetypeLabel: pitch.archetypeLabel,
      industry: pitch.industry,
      investedAmount: pitch.ask,
      currentValueMultiplier: 1.0,
      turnsHeld: 0,
      status: "passed",
      trait: pitch.trait,
      outcomeWeights: pitch.outcomeWeights,
      history: [],
      valuationAtPass: pitch.valuation
    };

    const updatedPitches = currentPitches.filter(p => p.instanceId !== pitchInstanceId);
    set({ 
      currentPitches: updatedPitches,
      passedPitches: [ghostHolding, ...passedPitches]
    });
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  },

  proposeFollowOn: (pitchId, investedAmount, offerAmount) => {
    const { cash, portfolio, pendingOffers } = get();
    if (cash < offerAmount || offerAmount <= 0) return;

    const holding = portfolio.find(h => h.pitchId === pitchId && h.investedAmount === investedAmount && h.status === "active");
    if (!holding) return;

    if (pendingOffers.some(o => o.pitchId === pitchId && o.investedAmount === investedAmount)) return;

    set({
      cash: cash - offerAmount,
      pendingOffers: [...pendingOffers, {
        id: `offer_${Date.now()}`,
        pitchId: holding.pitchId,
        investedAmount: holding.investedAmount,
        businessName: holding.businessName,
        offerAmount,
        archetypeLabel: holding.archetypeLabel,
        currentValueMultiplier: holding.currentValueMultiplier,
        valuationAtInvestment: holding.valuationAtInvestment,
        equityPercent: holding.equityPercent
      }]
    });
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  },

  resolveEventOption: (eventId, effectType) => {
    const { eventQueue, portfolio, cash, netWorthHistory } = get();
    const event = eventQueue.find(e => e.id === eventId);
    if (!event) return;

    let nextCash = cash;
    let nextPortfolio = [...portfolio];

    nextPortfolio = nextPortfolio.map(h => {
      if (h.pitchId === event.pitchId && h.investedAmount === event.investedAmount && h.status === "active") {
        if (effectType === "accept_follow_on") {
          nextCash -= event.eventAsk;
          return {
            ...h,
            investedAmount: h.investedAmount + event.eventAsk,
            capitalContributions: [
              ...(h.capitalContributions || [{ amount: h.investedAmount, turn: "Start", type: "Initial Investment" }]),
              { amount: event.eventAsk, turn: get().turn, type: "Follow-On Funding" }
            ]
          };
        } else if (effectType === "acknowledge_offer_accepted") {
          // Cash was already deducted when offer was made
          const offerAmount = event.options.find(o => o.effectType === effectType)?.offerAmount || 0;
          return {
            ...h,
            investedAmount: h.investedAmount + offerAmount,
            capitalContributions: [
              ...(h.capitalContributions || [{ amount: h.investedAmount, turn: "Start", type: "Initial Investment" }]),
              { amount: offerAmount, turn: get().turn, type: "Proactive Offer" }
            ]
          };
        } else if (effectType === "decline_follow_on") {
          const dilutionFactor = 0.65 + Math.random() * 0.1;
          const nextEquity = Number((h.equityPercent * dilutionFactor).toFixed(2));
          return {
            ...h,
            equityPercent: nextEquity,
            history: [
              ...(h.history || []),
              {
                turn: get().turn,
                outcomeType: "dilution",
                multiplier: 1.0,
                value: Math.round(h.investedAmount * h.currentValueMultiplier),
                changePercent: 0,
                note: `Diluted from ${h.equityPercent}% to ${nextEquity}%`
              }
            ]
          };
        } else if (effectType === "accept_buyout") {
          nextCash += event.buyoutAmount;
          return {
            ...h,
            status: "exited",
            exitValue: event.buyoutAmount
          };
        } else if (effectType === "accept_distress") {
          nextCash -= event.eventAsk;
          return {
            ...h,
            investedAmount: h.investedAmount + event.eventAsk,
            capitalContributions: [
              ...(h.capitalContributions || [{ amount: h.investedAmount, turn: "Start", type: "Initial Investment" }]),
              { amount: event.eventAsk, turn: get().turn, type: "Emergency Capital" }
            ]
          };
        } else if (effectType === "decline_distress") {
          return {
            ...h,
            status: "failed",
            currentValueMultiplier: 0,
            history: [
              ...(h.history || []),
              {
                turn: get().turn,
                outcomeType: "decline",
                multiplier: 0,
                value: 0,
                changePercent: -100,
                note: "Declared bankruptcy due to liquidity crisis."
              }
            ]
          };
        } else if (effectType === "accept_lawsuit_settlement") {
          nextCash -= 150000;
          return {
            ...h,
            history: [
              ...(h.history || []),
              {
                turn: get().turn,
                outcomeType: "penalty",
                multiplier: 1.0,
                value: Math.round(h.investedAmount * h.currentValueMultiplier),
                changePercent: 0,
                note: "Paid $150k to settle conflict of interest dispute."
              }
            ]
          };
        } else if (effectType === "decline_lawsuit_settlement") {
          return {
            ...h,
            status: "failed",
            currentValueMultiplier: 0,
            history: [
              ...(h.history || []),
              {
                turn: get().turn,
                outcomeType: "decline",
                multiplier: 0,
                value: 0,
                changePercent: -100,
                note: "Founder dissolved partnership over conflict of interest breach."
              }
            ]
          };
        }
      }
      return h;
    });

    if (effectType === "acknowledge_offer_declined") {
      const offerAmount = event.options.find(o => o.effectType === effectType)?.offerAmount || 0;
      nextCash += offerAmount;
    }

    const updatedEventQueue = eventQueue.filter(e => e.id !== eventId);

    const activeValue = nextPortfolio
      .filter(h => h.status === "active" || h.status === "exit_pending")
      .reduce((sum, h) => sum + Math.round(h.investedAmount * h.currentValueMultiplier), 0);
    const nextNetWorth = nextCash + activeValue;
    const nextNetWorthHistory = [...netWorthHistory.slice(0, -1), nextNetWorth];

    let nextGameOver = get().gameOver;
    if (nextNetWorth <= 0) {
      nextGameOver = true;
      nextCash = 0;
    }

    set({
      cash: nextCash,
      portfolio: nextPortfolio,
      eventQueue: updatedEventQueue,
      netWorthHistory: nextNetWorthHistory,
      gameOver: nextGameOver
    });

    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  },

  togglePinNews: (newsId) => {
    const { pinnedNewsIds } = get();
    const isPinned = pinnedNewsIds.includes(newsId);
    
    if (!isPinned && pinnedNewsIds.length >= 4) {
      return; // Enforce 4 maximum pins limit
    }
    
    const nextPinned = isPinned
      ? pinnedNewsIds.filter(id => id !== newsId)
      : [...pinnedNewsIds, newsId];
    
    set({ pinnedNewsIds: nextPinned });
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  }
}));
export default useGameStore;
