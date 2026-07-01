import { create } from "zustand";
import { generatePitchesForTurn, getNewsForTurn, resolveTurn } from "../engine/turnResolution";
import { TRAITS } from "../data/traits";

const SAVE_KEY = "investor_game_save_v2";
const SAVE_VERSION = 2;
const INITIAL_CASH = 10000000; // $10,000,000 starting cash
const DEMO_INDUSTRY = "Health & Wellness";

const createInitialState = () => {
  const initialPitches = generatePitchesForTurn(DEMO_INDUSTRY, 3);
  const initialNews = getNewsForTurn(1, DEMO_INDUSTRY);

  return {
    saveVersion: SAVE_VERSION,
    turn: 1,
    cash: INITIAL_CASH,
    netWorthHistory: [INITIAL_CASH],
    points: { available: 5, max: 5 },
    industry: DEMO_INDUSTRY,
    portfolio: [],
    eventQueue: [],
    diligenceLog: {}, // instanceId -> { backgroundChecked: bool, deepDivedCount: number, revealedTraits: string[], lastDeepDiveResult: "hit" | "miss" | "no_more" | null }
    currentPitches: initialPitches,
    currentNews: initialNews,
    gameOver: false,
    demoFinished: false
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

    const nextStateValues = resolveTurn(state, 100000); // $100K operating cost per turn
    set(nextStateValues);

    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  },

  conductBackgroundCheck: (pitchInstanceId) => {
    const { points, diligenceLog, currentPitches } = get();
    if (points.available < 1) return;

    const pitch = currentPitches.find(p => p.instanceId === pitchInstanceId);
    if (!pitch) return;

    const currentLog = diligenceLog[pitchInstanceId] || {
      backgroundChecked: false,
      deepDivedCount: 0,
      revealedTraits: [],
      lastDeepDiveResult: null
    };

    if (currentLog.backgroundChecked) return;

    const newLog = {
      ...currentLog,
      backgroundChecked: true
    };

    set({
      points: { ...points, available: points.available - 1 },
      diligenceLog: {
        ...diligenceLog,
        [pitchInstanceId]: newLog
      }
    });

    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  },

  conductDeepDive: (pitchInstanceId) => {
    const { points, diligenceLog, currentPitches } = get();
    if (points.available < 2) return;

    const pitch = currentPitches.find(p => p.instanceId === pitchInstanceId);
    if (!pitch) return;

    const currentLog = diligenceLog[pitchInstanceId] || {
      backgroundChecked: false,
      deepDivedCount: 0,
      revealedTraits: [],
      lastDeepDiveResult: null
    };

    const isMiss = Math.random() < 0.25;
    let result = "miss";
    let revealedTraits = [...currentLog.revealedTraits];

    if (!isMiss) {
      // Find traits in the pitch that are deep-dive discoverable AND not already revealed
      const discoverableTraits = pitch.traits.filter(traitId => {
        const traitDef = TRAITS[traitId];
        return traitDef && traitDef.discoverable.deepDive && !revealedTraits.includes(traitId);
      });

      if (discoverableTraits.length > 0) {
        // Pick one at random
        const chosenTrait = discoverableTraits[Math.floor(Math.random() * discoverableTraits.length)];
        revealedTraits.push(chosenTrait);
        result = "hit";
      } else {
        result = "no_more";
      }
    }

    const newLog = {
      ...currentLog,
      deepDivedCount: currentLog.deepDivedCount + 1,
      revealedTraits,
      lastDeepDiveResult: result
    };

    set({
      points: { ...points, available: points.available - 2 },
      diligenceLog: {
        ...diligenceLog,
        [pitchInstanceId]: newLog
      }
    });

    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...get() }));
  },

  investInPitch: (pitchInstanceId) => {
    const { cash, currentPitches, portfolio } = get();
    const pitch = currentPitches.find(p => p.instanceId === pitchInstanceId);
    if (!pitch || cash < pitch.ask) return;

    const equityPercent = Number(((pitch.ask / pitch.valuation) * 100).toFixed(2));

    const newHolding = {
      pitchId: pitch.id,
      businessName: pitch.businessName,
      archetype: pitch.archetype,
      investedAmount: pitch.ask,
      equityPercent,
      currentValueMultiplier: 1.0,
      turnsHeld: 0,
      status: "active",
      eventChance: { base: 0.1, trendModifier: 0 },
      traits: pitch.traits, // Captured ground truth
      outcomeWeights: pitch.outcomeWeights, // Captured ground truth
      history: [],
      pitchSummary: pitch.pitchSummary,
      valuationAtInvestment: pitch.valuation
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
    const { currentPitches } = get();
    const updatedPitches = currentPitches.filter(p => p.instanceId !== pitchInstanceId);
    set({ currentPitches: updatedPitches });
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
            investedAmount: h.investedAmount + event.eventAsk
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
            investedAmount: h.investedAmount + event.eventAsk
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
        }
      }
      return h;
    });

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
  }
}));
export default useGameStore;
