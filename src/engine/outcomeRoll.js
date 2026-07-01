import { TRAITS } from "../data/traits.js";

/**
 * Rolls the performance outcome for a single holding for a turn.
 * @param {Object} holding - The portfolio holding object
 * @returns {Object} { outcomeType, multiplier, newValueMultiplier, isFailed }
 */
export function rollHoldingOutcome(holding) {
  const { outcomeWeights, traits, currentValueMultiplier } = holding;

  // 1. Gather all trait nudges
  let growthWeight = outcomeWeights.growth;
  let declineWeight = outcomeWeights.decline;
  let volatileWeight = outcomeWeights.volatile;

  traits.forEach(traitId => {
    const trait = TRAITS[traitId];
    if (trait && trait.outcomeNudge) {
      growthWeight += trait.outcomeNudge.growth || 0;
      declineWeight += trait.outcomeNudge.decline || 0;
      volatileWeight += trait.outcomeNudge.volatile || 0;
    }
  });

  // Clamp weights at 0 to avoid negative probabilities
  growthWeight = Math.max(0, growthWeight);
  declineWeight = Math.max(0, declineWeight);
  volatileWeight = Math.max(0, volatileWeight);

  const totalWeight = growthWeight + declineWeight + volatileWeight;

  // Select outcome type based on weights
  let outcomeType = "growth";
  if (totalWeight > 0) {
    const roll = Math.random() * totalWeight;
    if (roll < growthWeight) {
      outcomeType = "growth";
    } else if (roll < growthWeight + declineWeight) {
      outcomeType = "decline";
    } else {
      outcomeType = "volatile";
    }
  } else {
    // Fallback if weights somehow sum to zero
    outcomeType = "volatile";
  }

  // Calculate multiplier based on outcome type
  let multiplier = 1.0;
  if (outcomeType === "growth") {
    // Growth: +5% to +25%
    multiplier = 1.05 + Math.random() * 0.20;
  } else if (outcomeType === "decline") {
    // Decline: -5% to -35%
    multiplier = 0.65 + Math.random() * 0.30;
  } else {
    // Volatile: -70% to +60% (negative-biased — unpredictability punishes more than it rewards)
    multiplier = 0.30 + Math.random() * 1.30;
  }

  // Calculate new value multiplier
  let nextValueMultiplier = currentValueMultiplier * multiplier;
  let isFailed = false;

  // Bankruptcy condition: if the company value drops below 10% of initial investment value
  if (nextValueMultiplier < 0.10) {
    nextValueMultiplier = 0;
    isFailed = true;
  }

  return {
    outcomeType,
    multiplier,
    newValueMultiplier: nextValueMultiplier,
    isFailed
  };
}
