import { TRAITS } from "../data/traits.js";

/**
 * Rolls the performance outcome for a single holding for a turn.
 * @param {Object} holding - The portfolio holding object
 * @returns {Object} { outcomeType, multiplier, newValueMultiplier, isFailed }
 */
export function rollHoldingOutcome(holding, activeNewsEffects = []) {
  const { outcomeWeights, trait, currentValueMultiplier, industry } = holding;

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
      growthWeight += effect.macroModifiers.growthWeightModifier || 0;
      declineWeight += effect.macroModifiers.declineWeightModifier || 0;
      volatileWeight += effect.macroModifiers.volatileWeightModifier || 0;
      multiplierModifier += effect.macroModifiers.valueMultiplierModifier || 0;
    }
  });

  // Apply trait nudge (single trait string)
  if (trait) {
    const traitDef = TRAITS[trait];
    if (traitDef && traitDef.outcomeNudge) {
      growthWeight += traitDef.outcomeNudge.growth || 0;
      declineWeight += traitDef.outcomeNudge.decline || 0;
      volatileWeight += traitDef.outcomeNudge.volatile || 0;
    }
  }

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
    // Range: +3% to +13% (centered around +8%)
    multiplier = 1.03 + Math.random() * 0.10;
  } else if (outcomeType === "decline") {
    // Range: -12% to -2% (centered around -7%)
    multiplier = 0.88 + Math.random() * 0.10;
  } else {
    // Volatile (rare extreme boom/bust)
    // Range: -30% to +40%
    multiplier = 0.70 + Math.random() * 0.70;
  }

  // Apply macro multiplier modifier silently
  multiplier = Math.max(0.1, multiplier + multiplierModifier);

  // Ensure outcomeType label matches reality if macro modifiers flipped it
  if (outcomeType === "decline" && multiplier >= 1.0) outcomeType = "growth";
  if (outcomeType === "growth" && multiplier < 1.0) outcomeType = "decline";

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
