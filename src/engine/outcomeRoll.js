import { TRAITS } from "../data/traits.js";

/**
 * Rolls the performance outcome for a single holding for a turn.
 * @param {Object} holding - The portfolio holding object
 * @returns {Object} { outcomeType, multiplier, newValueMultiplier, isFailed }
 */
export function rollHoldingOutcome(holding, activeNewsEffects = []) {
  const { outcomeWeights, traits, currentValueMultiplier, industry } = holding;

  // 1. Gather all trait nudges and active news modifiers
  let growthWeight = outcomeWeights.growth;
  let declineWeight = outcomeWeights.decline;
  let volatileWeight = outcomeWeights.volatile;
  let multiplierModifier = 0;

  activeNewsEffects.forEach(effect => {
    // Check if news applies to this industry
    if (effect.scope === "industry" && effect.industry && effect.industry !== industry) {
      return;
    }
    
    if (effect.macroModifiers) {
      growthWeight += effect.macroModifiers.declineWeightModifier || 0;
      declineWeight += effect.macroModifiers.declineWeightModifier || 0;
      volatileWeight += effect.macroModifiers.volatileWeightModifier || 0;
      multiplierModifier += effect.macroModifiers.valueMultiplierModifier || 0;
    }
  });

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
    outcomeType = "volatile";
  }

  // Calculate multiplier based on outcome type
  let multiplier = 1.0;
  if (outcomeType === "growth") {
    multiplier = 1.05 + Math.random() * 0.20;
  } else if (outcomeType === "decline") {
    multiplier = 0.65 + Math.random() * 0.30;
  } else {
    multiplier = 0.30 + Math.random() * 1.30;
  }

  // Apply macro multiplier modifier silently
  multiplier = Math.max(0.1, multiplier + multiplierModifier);

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
