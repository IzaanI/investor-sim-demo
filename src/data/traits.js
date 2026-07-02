export const TRAITS = {
  // ─── RISK TRAITS ───────────────────────────────────────────────────────────
  questionable_legal_history: {
    id: "questionable_legal_history",
    label: "Questionable Legal History",
    severity: "severe",
    category: "legal",
    backgroundClue: [
      "Public records show the founder was named in multiple civil disputes over the past seven years.",
      "A prior company associated with this founder was dissolved under contested circumstances. Court filings are partially sealed."
    ],
    outcomeNudge: { growth: -0.15, decline: 0.25, volatile: 0.1 }
  },
  uncalculated_risk_taker: {
    id: "uncalculated_risk_taker",
    label: "Uncalculated Risk Taker",
    severity: "moderate",
    category: "personality",
    backgroundClue: [
      "Sector contacts describe the founder as someone who moves fast and rarely pauses for legal or compliance review.",
      "A former colleague noted in a public forum that the founder has a pattern of launching before regulatory clearance."
    ],
    outcomeNudge: { growth: 0.1, decline: 0.2, volatile: 0.4 }
  },
  inflated_metrics: {
    id: "inflated_metrics",
    label: "Inflated Metrics",
    severity: "severe",
    category: "financial",
    backgroundClue: [
      "A data provider cross-referencing app store ratings and web traffic suggests active user counts may be significantly overstated.",
      "Industry contacts familiar with this company's space say the reported figures are inconsistent with typical conversion rates at this stage."
    ],
    outcomeNudge: { growth: -0.3, decline: 0.35, volatile: 0.0 }
  },
  passionate_but_inexperienced: {
    id: "passionate_but_inexperienced",
    label: "Passionate but Inexperienced",
    severity: "mild",
    category: "personality",
    backgroundClue: [
      "The founder completed their undergraduate degree two years ago and has no prior company leadership on record.",
      "LinkedIn and public profiles show strong domain knowledge but no management or operational track record."
    ],
    outcomeNudge: { growth: -0.05, decline: 0.1, volatile: 0.15 }
  },
  key_man_risk: {
    id: "key_man_risk",
    label: "Key Man Risk",
    severity: "moderate",
    category: "structure",
    backgroundClue: [
      "Public records show no named co-founders or senior hires in any prior filing associated with this company.",
      "A LinkedIn search returns only one employee associated with the company. No engineering or operational hires are listed."
    ],
    outcomeNudge: { growth: 0.05, decline: 0.15, volatile: 0.25 }
  },
  over_optimized_marketing: {
    id: "over_optimized_marketing",
    label: "Over-Optimised Marketing",
    severity: "mild",
    category: "process",
    backgroundClue: [
      "Ad spend data from a third-party tool shows unusually high paid acquisition relative to the company's reported revenue.",
      "A consumer review aggregator shows strong initial ratings followed by a sharp drop-off in reviews after 60 days — a common pattern in high-churn subscription businesses."
    ],
    outcomeNudge: { growth: -0.1, decline: 0.1, volatile: 0.1 }
  },

  // ─── NEUTRAL PROCESS TRAITS ────────────────────────────────────────────────
  shops_deal: {
    id: "shops_deal",
    label: "Shops the Deal",
    severity: "neutral",
    category: "process",
    backgroundClue: [
      "Multiple sources in the investor community confirm this deal has been circulating for several months.",
      "Two other firms received the same deck within the past six weeks. The round has not closed."
    ],
    outcomeNudge: { growth: 0.0, decline: 0.0, volatile: 0.0 }
  },
  bootstrapped_culture: {
    id: "bootstrapped_culture",
    label: "Bootstrapped Culture",
    severity: "neutral",
    category: "history",
    backgroundClue: [
      "Company registry shows the founders funded operations through consulting revenues for the first eighteen months.",
      "Cap table shows zero outside institutional investors prior to this current seed round."
    ],
    outcomeNudge: { growth: 0.0, decline: 0.0, volatile: 0.0 }
  },
  niche_focus: {
    id: "niche_focus",
    label: "Niche Focus",
    severity: "neutral",
    category: "strategy",
    backgroundClue: [
      "Ad diagnostics indicate the company operates strictly within a tight sub-demographic, with limited intent to expand adjacent lines.",
      "Customer cohorts indicate high advocacy scores but within a restricted, highly specific user pool."
    ],
    outcomeNudge: { growth: 0.0, decline: 0.0, volatile: 0.0 }
  },

  // ─── POSITIVE TRAITS ───────────────────────────────────────────────────────
  solid_prior_exit: {
    id: "solid_prior_exit",
    label: "Solid Prior Exit",
    severity: "positive",
    category: "history",
    backgroundClue: [
      "The founder's previous company was acquired three years ago. The transaction returned capital to early investors.",
      "Press records confirm a successful exit in an adjacent sector. The founder was listed as co-founder and CTO."
    ],
    outcomeNudge: { growth: 0.15, decline: -0.1, volatile: -0.05 }
  },
  proprietary_tech: {
    id: "proprietary_tech",
    label: "Proprietary Technology",
    severity: "positive",
    category: "technology",
    backgroundClue: [
      "Public patent registries show two active, approved utility patents assigned directly to this company.",
      "Technical advisers confirm the core algorithm is highly defensible and not reliant on public APIs."
    ],
    outcomeNudge: { growth: 0.15, decline: -0.10, volatile: -0.05 }
  },
  efficient_operations: {
    id: "efficient_operations",
    label: "High Capital Efficiency",
    severity: "positive",
    category: "financial",
    backgroundClue: [
      "Interviews with vendor contacts show the team maintains extremely low overhead and is close to operational breakeven.",
      "Financial audits confirm a customer acquisition payback period under three months."
    ],
    outcomeNudge: { growth: 0.10, decline: -0.10, volatile: 0.00 }
  }
};
