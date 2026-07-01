export const TRAITS = {
  questionable_legal_history: {
    id: "questionable_legal_history",
    label: "Questionable Legal History",
    severity: "severe",
    category: "legal",
    discoverable: { backgroundCheck: true, deepDive: true },
    backgroundCheckHint: "Public records show the founder was named in multiple civil disputes.",
    deepDiveReveal: "Founder was previously sued for misappropriation of funds in a past venture. Settled out of court under NDA.",
    outcomeNudge: { growth: -0.15, decline: 0.25, volatile: 0.1 }
  },
  uncalculated_risk_taker: {
    id: "uncalculated_risk_taker",
    label: "Uncalculated Risk Taker",
    severity: "moderate",
    category: "personality",
    discoverable: { backgroundCheck: false, deepDive: true },
    backgroundCheckHint: "Nothing notable on a basic background search.",
    deepDiveReveal: "The founder frequently overrides safety protocols and ignores legal counsel regarding product claims.",
    outcomeNudge: { growth: 0.1, decline: 0.2, volatile: 0.4 }
  },
  shops_deal: {
    id: "shops_deal",
    label: "Shops the Deal",
    severity: "neutral",
    category: "process",
    discoverable: { backgroundCheck: true, deepDive: false },
    backgroundCheckHint: "Heard from other VCs that this founder is pitching everywhere.",
    deepDiveReveal: "The founder is actively seeking multiple term sheets to bid up valuation.",
    outcomeNudge: { growth: 0.0, decline: 0.0, volatile: 0.0 }
  },
  inflated_metrics: {
    id: "inflated_metrics",
    label: "Inflated Metrics",
    severity: "severe",
    category: "financial",
    discoverable: { backgroundCheck: false, deepDive: true },
    backgroundCheckHint: "Initial financial statements look clean.",
    deepDiveReveal: "Diligence reveals 'active users' include non-paying trial accounts that expired months ago. Real MRR is 40% lower.",
    outcomeNudge: { growth: -0.3, decline: 0.35, volatile: 0.0 }
  },
  passionate_but_inexperienced: {
    id: "passionate_but_inexperienced",
    label: "Passionate but Inexperienced",
    severity: "mild",
    category: "personality",
    discoverable: { backgroundCheck: true, deepDive: false },
    backgroundCheckHint: "Founder is a recent graduate with limited corporate leadership experience.",
    deepDiveReveal: "While visionary, the founder lacks experience managing budgets and building mid-level management.",
    outcomeNudge: { growth: -0.05, decline: 0.1, volatile: 0.15 }
  },
  solid_prior_exit: {
    id: "solid_prior_exit",
    label: "Solid Prior Exit",
    severity: "neutral",
    category: "history",
    discoverable: { backgroundCheck: true, deepDive: true },
    backgroundCheckHint: "Founder successfully sold a wellness startup three years ago.",
    deepDiveReveal: "The prior business was acquired for $12M, returning 3x to early investors. Founder has a reputation for execution.",
    outcomeNudge: { growth: 0.15, decline: -0.1, volatile: -0.05 }
  },
  key_man_risk: {
    id: "key_man_risk",
    label: "Key Man Risk",
    severity: "moderate",
    category: "personality",
    discoverable: { backgroundCheck: true, deepDive: true },
    backgroundCheckHint: "Company is built entirely around the proprietary knowledge of one founder.",
    deepDiveReveal: "The company's core systems and source code are undocumented; if the chief architect leaves, the product cannot scale.",
    outcomeNudge: { growth: 0.05, decline: 0.15, volatile: 0.25 }
  },
  over_optimized_marketing: {
    id: "over_optimized_marketing",
    label: "Over-Optimized Marketing",
    severity: "mild",
    category: "process",
    discoverable: { backgroundCheck: false, deepDive: true },
    backgroundCheckHint: "Social media and search ad presence look very strong.",
    deepDiveReveal: "Customer acquisition cost looks low, but customer cohort retention drops off by 90% in Month 2. Customers exit immediately.",
    outcomeNudge: { growth: -0.1, decline: 0.1, volatile: 0.1 }
  }
};
