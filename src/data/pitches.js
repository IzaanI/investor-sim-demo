export const PITCH_TEMPLATES = [
  {
    id: "vitality_pure",
    businessName: "VitalityPure",
    industry: "Health & Wellness",
    archetype: "Direct-to-Consumer Supplements",
    baseAsk: 100000,
    baseValuation: 650000,
    pitchSummary: "VitalityPure offers organic, personalized vitamin blends formulated by artificial intelligence. Seeking capital to scale manufacturing and expand marketing.",
    possibleTraitPool: ["inflated_metrics", "uncalculated_risk_taker", "shops_deal"],
    traitCountRange: [1, 2],
    baseOutcomeWeights: {
      growth: 0.4,
      decline: 0.3,
      volatile: 0.3
    },
    outcomeWeightVariance: 0.05
  },
  {
    id: "aura_sleep",
    businessName: "Aura Sleep",
    industry: "Health & Wellness",
    archetype: "Wearable Bio-hacking",
    baseAsk: 150000,
    baseValuation: 1000000,
    pitchSummary: "Aura Sleep is a smart headband that monitors EEG waves and uses acoustic stimulation to increase deep sleep. Seeking capital to expand R&D and launch retail partnerships.",
    possibleTraitPool: ["solid_prior_exit", "passionate_but_inexperienced", "shops_deal"],
    traitCountRange: [1, 2],
    baseOutcomeWeights: {
      growth: 0.5,
      decline: 0.3,
      volatile: 0.2
    },
    outcomeWeightVariance: 0.05
  },
  {
    id: "rejuvenate_labs",
    businessName: "Rejuvenate Labs",
    industry: "Health & Wellness",
    archetype: "Longevity Clinics",
    baseAsk: 250000,
    baseValuation: 1500000,
    pitchSummary: "Rejuvenate Labs provides cellular hydration, cryotherapy, and biomarkers in boutique clinics. We have 3 clinics active and seek funding for regional expansion.",
    possibleTraitPool: ["questionable_legal_history", "uncalculated_risk_taker", "solid_prior_exit"],
    traitCountRange: [1, 2],
    baseOutcomeWeights: {
      growth: 0.3,
      decline: 0.3,
      volatile: 0.4
    },
    outcomeWeightVariance: 0.1
  },
  {
    id: "core_foods",
    businessName: "Core Foods",
    industry: "Health & Wellness",
    archetype: "Personalized Meal Kits",
    baseAsk: 75000,
    baseValuation: 450000,
    pitchSummary: "Core Foods delivers chef-prepared, macro-balanced meals customized to user DNA test kits. High retention and high margin, seeking capital to scale customer acquisition.",
    possibleTraitPool: ["inflated_metrics", "passionate_but_inexperienced"],
    traitCountRange: [1, 1],
    baseOutcomeWeights: {
      growth: 0.6,
      decline: 0.3,
      volatile: 0.1
    },
    outcomeWeightVariance: 0.05
  },
  {
    id: "flex_stretch",
    businessName: "FlexStretch",
    industry: "Health & Wellness",
    archetype: "Smart Gym Equipment",
    baseAsk: 200000,
    baseValuation: 1300000,
    pitchSummary: "FlexStretch is an interactive pilates reformer wall mount with computer vision to track form. 500 pre-orders shipped, capital needed to scale production.",
    possibleTraitPool: ["key_man_risk", "shops_deal", "solid_prior_exit"],
    traitCountRange: [1, 2],
    baseOutcomeWeights: {
      growth: 0.45,
      decline: 0.35,
      volatile: 0.2
    },
    outcomeWeightVariance: 0.05
  },
  {
    id: "zen_mind",
    businessName: "ZenMind",
    industry: "Health & Wellness",
    archetype: "Mental Health App",
    baseAsk: 60000,
    baseValuation: 400000,
    pitchSummary: "ZenMind is a meditation app utilizing biosensors on wearables to dynamically customize soundscapes. Over 50k active subscriptions.",
    possibleTraitPool: ["over_optimized_marketing", "passionate_but_inexperienced"],
    traitCountRange: [1, 1],
    baseOutcomeWeights: {
      growth: 0.5,
      decline: 0.4,
      volatile: 0.1
    },
    outcomeWeightVariance: 0.05
  },
  {
    id: "hydro_pulse",
    businessName: "HydroPulse",
    industry: "Health & Wellness",
    archetype: "Smart Water Bottles",
    baseAsk: 80000,
    baseValuation: 500000,
    pitchSummary: "HydroPulse tracks cellular hydration level via saliva contact on the nozzle. Capital needed to resolve container logistics.",
    possibleTraitPool: ["uncalculated_risk_taker", "questionable_legal_history", "key_man_risk"],
    traitCountRange: [1, 2],
    baseOutcomeWeights: {
      growth: 0.3,
      decline: 0.4,
      volatile: 0.3
    },
    outcomeWeightVariance: 0.1
  },
  {
    id: "ergo_back",
    businessName: "ErgoBack",
    industry: "Health & Wellness",
    archetype: "Bespoke Office Furniture",
    baseAsk: 120000,
    baseValuation: 800000,
    pitchSummary: "ErgoBack designs biomechanically active posture-correcting office chairs. B2B contracts signed with three major tech firms.",
    possibleTraitPool: ["solid_prior_exit", "shops_deal", "inflated_metrics"],
    traitCountRange: [1, 2],
    baseOutcomeWeights: {
      growth: 0.55,
      decline: 0.3,
      volatile: 0.15
    },
    outcomeWeightVariance: 0.05
  },
  {
    id: "bio_byte",
    businessName: "BioByte",
    industry: "Health & Wellness",
    archetype: "DNA-based Skincare",
    baseAsk: 140000,
    baseValuation: 950000,
    pitchSummary: "BioByte delivers anti-aging serums tailored to custom epigenetic swabs. Strong initial retention in test demographic.",
    possibleTraitPool: ["inflated_metrics", "over_optimized_marketing", "uncalculated_risk_taker"],
    traitCountRange: [1, 2],
    baseOutcomeWeights: {
      growth: 0.4,
      decline: 0.4,
      volatile: 0.2
    },
    outcomeWeightVariance: 0.05
  },
  {
    id: "green_bite",
    businessName: "GreenBite",
    industry: "Health & Wellness",
    archetype: "Plant-Based Protein Snacks",
    baseAsk: 50000,
    baseValuation: 300000,
    pitchSummary: "GreenBite produces plant protein bars that taste like confectionary candy. Already stocked in 150 local organic grocery stores.",
    possibleTraitPool: ["passionate_but_inexperienced", "shops_deal"],
    traitCountRange: [1, 1],
    baseOutcomeWeights: {
      growth: 0.5,
      decline: 0.3,
      volatile: 0.2
    },
    outcomeWeightVariance: 0.05
  }
];
