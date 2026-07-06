import { PITCH_TEMPLATES } from "../data/pitches.js";
import { NEWS_BANK } from "../data/news.js";
import { COMPANY_NEWS_TEMPLATES } from "../data/companyNews.js";
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
function generateRuntimeMetrics(valuation) {
  // Derive MRR from valuation. Assume Valuation is 4x-12x ARR.
  const arrMultiplier = 4 + Math.random() * 8;
  const arr = valuation / arrMultiplier;
  const mrrRaw = arr / 12;
  const mrr = Math.round(mrrRaw / 10) * 10; 

  // Derive active users from MRR. Assume ARPU is $5-$50.
  const arpu = 5 + Math.random() * 45;
  const usersRaw = mrr / arpu;
  const users = Math.round(usersRaw / 10) * 10;

  // Growth between 5% and 40%, with occasional decimals
  const growthRaw = 5 + Math.random() * 35;
  const growth = Math.random() > 0.5 ? growthRaw.toFixed(1) : Math.round(growthRaw);

  return {
    metric: `${users.toLocaleString()} active users`,
    revenueStr: `$${mrr.toLocaleString()} MRR`,
    growthStr: `${growth}% month-over-month`
  };
}

/**
 * Assembles a pitch from the segment pool using the template's archetype.
 * Returns an array of 5 interpolated paragraph strings (one per slot).
 */
function assemblePitch(template, businessName, archetypeKey, drawnSegments, valuation) {
  const slots = ["intro", "body", "close"];
  const allowedTones = ARCHETYPES[archetypeKey]?.tones || [];
  const metrics = generateRuntimeMetrics(valuation);

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
    const tonePool = (SEGMENTS[slot] || []).filter(s => 
      s.tones && s.tones.some(tone => allowedTones.includes(tone))
    );
    if (tonePool.length === 0) return "";

    // Deck System: Filter out already drawn segments
    let availablePool = tonePool.filter(s => !drawnSegments[slot].includes(s.id));
    
    // Reshuffle if deck is exhausted for this tone group
    if (availablePool.length === 0) {
      // Clear the drawn list for this slot to "reshuffle the deck"
      drawnSegments[slot] = [];
      availablePool = tonePool;
    }

    const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
    
    // Mark as drawn
    drawnSegments[slot].push(chosen.id);

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
export function rollPitchInstance(template, drawnSegments, usedBusinessNames, netWorth = 1000000, turnNumber = 1) {
  // 1. Deck system for Business Names
  const nameOptions = template.businessNames || [template.businessName || "Unknown Startup"];
  if (!usedBusinessNames[template.id]) usedBusinessNames[template.id] = [];
  
  let availableNames = nameOptions.filter(n => !usedBusinessNames[template.id].includes(n));
  if (availableNames.length === 0) {
    usedBusinessNames[template.id] = []; // Reshuffle
    availableNames = nameOptions;
  }
  
  const businessName = availableNames[Math.floor(Math.random() * availableNames.length)];
  usedBusinessNames[template.id].push(businessName);

  // Pick a random founder archetype key
  const archetypeKeys = Object.keys(ARCHETYPES);
  let selectedArchetypeKey = archetypeKeys[Math.floor(Math.random() * archetypeKeys.length)];

  if (turnNumber === 1) {
    selectedArchetypeKey = "operator";
  }

  // 1. Dynamic max ask based on Net Worth (scales up every $250k above $1M)
  const baseMaxAsk = 500000;
  const scalingSteps = Math.floor(Math.max(0, netWorth - 1000000) / 250000);
  const maxAsk = baseMaxAsk + (scalingSteps * 125000);
  
  const minAsk = 50000;
  const askRaw = minAsk + Math.random() * (maxAsk - minAsk);
  let ask = Math.round(askRaw / 5000) * 5000;

  if (turnNumber === 1) {
    ask = 100000;
  }

  // 2. Valuation 5–15× ask (nearest $25k)
  const multiplier = 5 + Math.random() * 10;
  const valuation = Math.round((ask * multiplier) / 25000) * 25000;

  // 3. Assemble pitch paragraphs using the dynamic name, archetype key, segment deck, and valuation
  const assembledParagraphs = assemblePitch(template, businessName, selectedArchetypeKey, drawnSegments, valuation);

  // 4. Pick one trait weighted by the selected archetype bias
  let traitId = pickTrait(selectedArchetypeKey);

  if (turnNumber === 1) {
    const safeTraits = ["efficient_operations", "niche_focus", "deep_domain_expertise", null];
    traitId = safeTraits[Math.floor(Math.random() * safeTraits.length)];
  }

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
export function generatePitchesForTurn(drawnSegments, seenTemplates, usedBusinessNames, netWorth = 1000000, turnNumber = 1) {
  let count = 3;
  if (turnNumber === 1) {
    count = 1;
  } else if (turnNumber === 2) {
    count = 2;
  } else {
    count = Math.random() < 0.5 ? 2 : 3;
  }

  const filtered = PITCH_TEMPLATES; // Draw from all industries
  
  // Weighted Selection System
  const weightedPool = filtered.map(template => {
    const timesSeen = seenTemplates[template.id] || 0;
    return {
      template,
      weight: 1 / (timesSeen + 1) // Weight drops significantly the more it's seen
    };
  });

  const selectedTemplates = [];
  for (let i = 0; i < Math.min(count, filtered.length); i++) {
    const totalWeight = weightedPool.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    let selectedIndex = 0;
    for (let j = 0; j < weightedPool.length; j++) {
      random -= weightedPool[j].weight;
      if (random <= 0) {
        selectedIndex = j;
        break;
      }
    }

    const chosen = weightedPool[selectedIndex].template;
    selectedTemplates.push(chosen);
    
    // Mark as seen for future turns (and the remainder of this turn)
    seenTemplates[chosen.id] = (seenTemplates[chosen.id] || 0) + 1;
    
    // Remove from the pool so we don't draw it twice in the same turn
    weightedPool.splice(selectedIndex, 1);
  }

  return selectedTemplates.map(template => rollPitchInstance(template, drawnSegments, usedBusinessNames, netWorth, turnNumber));
}

/**
 * Generates ambient (static) news procedurally.
 * Draws between 0 and 2 news items that haven't been seen yet, where minTurn <= turn.
 */
export function generateAmbientNews(turn, seenNewsIds = []) {
  if (turn === 1) {
    const nonNegativeNews = NEWS_BANK.filter(news => news.sentiment !== "negative");
    if (nonNegativeNews.length > 0) {
      const chosen = nonNegativeNews[Math.floor(Math.random() * nonNegativeNews.length)];
      return [chosen];
    }
  }

  let availableNews = NEWS_BANK.filter(news => {
    if (seenNewsIds.includes(news.id)) return false;
    if (news.minTurn && turn < news.minTurn) return false;
    return true;
  });

  if (availableNews.length === 0) return [];
  
  // E.g., 20% for 0, 50% for 1, 30% for 2 (if available)
  const roll = Math.random();
  let count = 0;
  if (roll > 0.70) count = 2;
  else if (roll > 0.20) count = 1;

  count = Math.min(count, availableNews.length);
  if (count === 0) return [];

  const chosen = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * availableNews.length);
    chosen.push(availableNews[idx]);
    availableNews.splice(idx, 1);
  }
  
  return chosen;
}

/**
 * Generates dynamic company-specific news from active portfolio holdings.
 * 40% chance per holding, positive or negative template based on momentum.
 * Returns at most `limit` items total.
 */
function generateCompanyNews(portfolio, nextTurn, limit = 3) {
  const companyHeadlines = [];

  // Shuffle portfolio to randomise which company gets a headline if we hit the cap
  const shuffled = shuffle([...portfolio]);

  for (const holding of shuffled) {
    if (companyHeadlines.length >= limit) break;
    if (holding.status !== "active") continue;
    if (Math.random() > 0.40) continue; // 40% chance

    const isPositive = holding.currentValueMultiplier >= 1.0;
    const pool = isPositive ? COMPANY_NEWS_TEMPLATES.positive : COMPANY_NEWS_TEMPLATES.negative;
    const template = pool[Math.floor(Math.random() * pool.length)];

    // Resolve market from holding (fall back gracefully)
    const market = holding.industry || "emerging";

    const headline = template.headline
      .replace(/\{\{companyName\}\}/g, holding.businessName)
      .replace(/\{\{market\}\}/g, market);

    const detail = template.detail
      .replace(/\{\{companyName\}\}/g, holding.businessName)
      .replace(/\{\{market\}\}/g, market);

    const actionableDetail = template.actionableDetail
      ? template.actionableDetail
          .replace(/\{\{companyName\}\}/g, holding.businessName)
          .replace(/\{\{market\}\}/g, market)
      : null;

    companyHeadlines.push({
      id: `company_news_${holding.pitchId}_${nextTurn}_${Math.floor(Math.random() * 1000)}`,
      turn: nextTurn,
      scope: "company",
      category: template.category,
      headline,
      detail,
      actionable: !!template.actionable,
      actionableDetail,
      pitchId: holding.pitchId,
      businessName: holding.businessName,
      sentiment: isPositive ? "positive" : "negative",
      timeString: `${Math.floor(Math.random() * 11) + 1}h ago`,
      duration: 0
    });
  }

  return companyHeadlines;
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
      const exitValue = Math.round(holding.valuationAtInvestment * holding.currentValueMultiplier * (holding.equityPercent / 100));
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
      const prevValue = Math.round(holding.valuationAtInvestment * holding.currentValueMultiplier * (holding.equityPercent / 100));
      const nextValue = Math.round(holding.valuationAtInvestment * newValueMultiplier * (holding.equityPercent / 100));

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

  // Roll outcomes for passed pitches (ghost tracking)
  let nextPassedPitches = (state.passedPitches || []).map(ghost => {
    if (ghost.status === "passed") {
      const { outcomeType, multiplier, newValueMultiplier, isFailed } = rollHoldingOutcome(ghost, state.activeNewsEffects);
      const nextValue = Math.round(ghost.valuationAtInvestment * newValueMultiplier * (ghost.equityPercent / 100));

      const historyLog = {
        turn: state.turn,
        outcomeType,
        multiplier,
        value: nextValue,
        changePercent: Math.round((multiplier - 1) * 100)
      };

      return {
        ...ghost,
        currentValueMultiplier: newValueMultiplier,
        turnsHeld: ghost.turnsHeld + 1,
        status: isFailed ? "failed" : "passed",
        history: [...(ghost.history || []), historyLog]
      };
    }
    return ghost;
  });

  const nextEventQueue = [];

  // 2.25 Founder Swap check
  nextPortfolio = nextPortfolio.map(holding => {
    if (holding.status !== "active") return holding;

    const diff = Math.abs(holding.currentValueMultiplier - (holding.lastMilestoneMultiplier || 1.0));
    if (diff >= 0.5) {
      if (Math.random() < 0.25) { // 25% chance
        const archetypeKeys = Object.keys(ARCHETYPES).filter(k => k !== holding.archetypeKey);
        const newArchetypeKey = archetypeKeys[Math.floor(Math.random() * archetypeKeys.length)];
        const newArchetypeLabel = ARCHETYPES[newArchetypeKey]?.label ?? newArchetypeKey;
        
        let newTrait = pickTrait(newArchetypeKey);
        if (newTrait === holding.trait) {
          const alternativeTrait = pickTrait(newArchetypeKey);
          if (alternativeTrait !== holding.trait) newTrait = alternativeTrait;
        }

        const baseWeights = { growth: 0.5, decline: 0.4, volatile: 0.1 };
        const nudges = TRAITS[newTrait]?.outcomeNudge || {};
        const g = Math.max(0, baseWeights.growth + (nudges.growth || 0));
        const d = Math.max(0, baseWeights.decline + (nudges.decline || 0));
        const v = Math.max(0, baseWeights.volatile + (nudges.volatile || 0));
        const total = g + d + v;
        const normalized = total > 0
          ? { growth: g / total, decline: d / total, volatile: v / total }
          : baseWeights;

        nextEventQueue.push({
          id: `founder_swap_${holding.pitchId}_${Date.now()}`,
          pitchId: holding.pitchId,
          investedAmount: holding.investedAmount,
          businessName: holding.businessName,
          type: "founder_swap",
          promptText: `The original founder of ${holding.businessName} has stepped down. A new CEO has taken the reins, changing the company's culture.`,
          options: [{ id: "ok", label: "Noted", effectType: "acknowledge_founder_swap" }]
        });

        return {
          ...holding,
          archetypeKey: newArchetypeKey,
          archetypeLabel: newArchetypeLabel,
          trait: newTrait,
          outcomeWeights: normalized,
          lastMilestoneMultiplier: holding.currentValueMultiplier,
          history: [
            ...(holding.history || []),
            {
              turn: state.turn,
              outcomeType: "swap",
              multiplier: 1.0,
              value: Math.round(holding.valuationAtInvestment * holding.currentValueMultiplier * (holding.equityPercent / 100)),
              changePercent: 0,
              note: `Leadership change: New CEO is ${newArchetypeLabel}.`
            }
          ]
        };
      }
    }
    return holding;
  });

  // 2.5 Generate events probabilistically for active holdings
  nextPortfolio.forEach(holding => {
    // Only roll events for holdings that survived this turn as 'active'
    if (holding.status === "active") {
      if (holding.coiLawsuitPending) {
        nextEventQueue.push({
          id: `coi_lawsuit_${holding.pitchId}_${Date.now()}`,
          pitchId: holding.pitchId,
          investedAmount: holding.investedAmount,
          businessName: holding.businessName,
          type: "lawsuit",
          promptText: `CONFLICT OF INTEREST LAWSUIT: The founder of ${holding.businessName} discovered your investment in a direct competitor. They are threatening to dissolve the partnership unless you settle out of court for $150,000.`,
          eventAsk: 150000,
          buyoutAmount: 0,
          options: [
            { id: "settle", label: "Pay $150,000 Settlement", effectType: "accept_lawsuit_settlement" },
            { id: "refuse", label: "Refuse (They walk away)", effectType: "decline_lawsuit_settlement" }
          ]
        });
        holding.coiLawsuitPending = false; // clear the flag so it doesn't trigger again
        return; // skip normal events for this turn
      }

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

  // 3. Process Pending Follow-On Offers
  let nextPendingOffers = []; // Wipe them after processing
  (state.pendingOffers || []).forEach(offer => {
    let baseAcceptChance = 0.5;
    if (offer.currentValueMultiplier < 1.0) baseAcceptChance = 0.9;
    else if (offer.currentValueMultiplier > 3.0) baseAcceptChance = 0.1;
    else if (offer.currentValueMultiplier > 1.5) baseAcceptChance = 0.3;

    if (offer.archetypeLabel === "The First-Timer" || offer.archetypeLabel === "The Friend") baseAcceptChance += 0.2;
    if (offer.archetypeLabel === "The Hustler" || offer.archetypeLabel === "The Operator") baseAcceptChance -= 0.2;
    
    const formatCurrency = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

    let eventType, promptText, options;
    const roll = Math.random();

    if (roll < baseAcceptChance) {
      eventType = "offer_accepted";
      promptText = `The founder of ${offer.businessName} has accepted your proactive follow-on offer of ${formatCurrency(offer.offerAmount)}.`;
      options = [{ id: "ok", label: "Great", effectType: "acknowledge_offer_accepted", pitchId: offer.pitchId, investedAmount: offer.investedAmount, offerAmount: offer.offerAmount }];
    } else if (roll < baseAcceptChance + 0.3) {
      eventType = "offer_declined";
      promptText = `The founder of ${offer.businessName} declined your offer of ${formatCurrency(offer.offerAmount)}, stating they have enough runway for now.`;
      options = [{ id: "ok", label: "Understood", effectType: "acknowledge_offer_declined", offerAmount: offer.offerAmount }];
    } else {
      eventType = "offer_ghosted";
      promptText = `You reached out to the founder of ${offer.businessName} with an offer of ${formatCurrency(offer.offerAmount)}, but they left you on read. The funds have been returned to your balance.`;
      options = [{ id: "ok", label: "Ouch", effectType: "acknowledge_offer_declined", offerAmount: offer.offerAmount }];
    }

    nextEventQueue.push({
      id: `offer_response_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      pitchId: offer.pitchId,
      investedAmount: offer.investedAmount,
      businessName: offer.businessName,
      type: eventType,
      promptText,
      options
    });
  });

  // 4. Deduct operating cost
  nextCash -= operatingCost;

  // 4. Calculate Net Worth
  // Net Worth = Spendable Cash + Current Value of all Active / Pending holdings
  const activeHoldingsValue = nextPortfolio
    .filter(h => h.status === "active" || h.status === "exit_pending")
    .reduce((sum, h) => sum + Math.round(h.valuationAtInvestment * h.currentValueMultiplier * (h.equityPercent / 100)), 0);

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
  let nextDrawnSegments = state.drawnSegments ? JSON.parse(JSON.stringify(state.drawnSegments)) : { intro: [], body: [], close: [] };
  let nextSeenTemplates = state.seenTemplates ? { ...state.seenTemplates } : {};
  let nextUsedBusinessNames = state.usedBusinessNames ? { ...state.usedBusinessNames } : {};

  let nextSeenNewsIds = [...(state.seenNewsIds || [])];

  if (!nextGameOver && !isDemoFinished) {
    nextPitches = generatePitchesForTurn(nextDrawnSegments, nextSeenTemplates, nextUsedBusinessNames, nextNetWorth, nextTurn);
    const ambientNews = generateAmbientNews(nextTurn, nextSeenNewsIds);
    ambientNews.forEach(news => nextSeenNewsIds.push(news.id));

    // Generate company-specific headlines
    // Dynamic cap: base 2, plus 1 for every 3 active holdings
    const activeHoldings = nextPortfolio.filter(h => h.status === "active");
    const dynamicCap = 2 + Math.floor(activeHoldings.length / 3);
    const remainingSlots = Math.max(0, dynamicCap - ambientNews.length);
    
    const companyNews = generateCompanyNews(nextPortfolio, nextTurn, remainingSlots);
    nextNews = [...ambientNews, ...companyNews];

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
    passedPitches: nextPassedPitches,
    pendingOffers: nextPendingOffers,
    eventQueue: [...(state.eventQueue || []), ...nextEventQueue],
    currentPitches: nextPitches,
    currentNews: nextNews,
    activeNewsEffects: nextActiveNewsEffects,
    gameOver: nextGameOver,
    demoFinished: isDemoFinished,
    diligenceLog: {},
    backgroundChecksRemaining: 1,
    pinnedNewsIds: [...(state.pinnedNewsIds || [])],
    drawnSegments: nextDrawnSegments,
    seenTemplates: nextSeenTemplates,
    usedBusinessNames: nextUsedBusinessNames,
    seenNewsIds: nextSeenNewsIds
  };
}
