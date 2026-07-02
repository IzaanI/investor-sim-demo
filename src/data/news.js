export const NEWS_BANK = [
  {
    id: "news_macro_rates",
    turn: 1,
    scope: "general",
    category: "POLICY",
    impact: "MEDIUM",
    timeString: "1 day ago",
    headline: "Interest Rates Held Steady by Central Bank",
    detail: "Central bank signals potential rate cuts in early next year as inflation shows signs of cooling. Markets react positively to the stability.",
    relevantTraits: []
  },
  {
    id: "news_supply_chain",
    turn: 1,
    scope: "general",
    category: "ECONOMY",
    impact: "MEDIUM",
    timeString: "5 hours ago",
    headline: "Global Supply Chain Delays Continue",
    detail: "New disruptions in key shipping lanes expected to impact wellness hardware container shipping through next 4 quarters.",
    relevantTraits: [],
    duration: 4,
    macroModifiers: {
      declineWeightModifier: 0.15,
      growthWeightModifier: -0.05,
      valueMultiplierModifier: -0.03
    }
  },
  {
    id: "news_wellness_claims",
    turn: 1,
    scope: "industry",
    industry: "Health & Wellness",
    category: "REGULATORY",
    impact: "HIGH",
    timeString: "2 hours ago",
    headline: "Regulators Probing Unsubstantiated Health Claims in Supplements",
    detail: "The Federal Trade Commission warns that wellness startups making clinical claims without peer-reviewed studies will face heavy audits and fines.",
    relevantTraits: ["uncalculated_risk_taker"],
    duration: 3,
    macroModifiers: {
      declineWeightModifier: 0.20,
      growthWeightModifier: -0.10
    }
  },
  {
    id: "news_legal_audits",
    turn: 2,
    scope: "general",
    category: "LEGAL",
    impact: "HIGH",
    timeString: "3 hours ago",
    headline: "Venture Capitalists Increase Background Audits on Founders",
    detail: "Following a series of corporate frauds, top firms are mandating rigorous legal background checks prior to term sheet execution.",
    relevantTraits: ["questionable_legal_history"]
  },
  {
    id: "news_wellness_boom",
    turn: 2,
    scope: "industry",
    industry: "Health & Wellness",
    category: "MARKETS",
    impact: "MEDIUM",
    timeString: "8 hours ago",
    headline: "Boutique Wellness Sector Outperforms Traditional Retail",
    detail: "Consumers are shifting discretionary spend towards high-end gym memberships and specialized dietary supplements.",
    relevantTraits: []
  },
  // --- TURN 3 EVENTS (Includes Rebound and Positive Boost) ---
  {
    id: "news_vc_rebound",
    turn: 3,
    scope: "general",
    category: "MARKETS",
    impact: "MEDIUM",
    timeString: "6 hours ago",
    headline: "Venture Capital Funding Activity Rebounds",
    detail: "Early-stage investment rounds show a 15% increase in deal volume compared to last quarter, signaling renewed interest in high-growth startups.",
    relevantTraits: []
  },
  {
    id: "news_preventive_subsidies",
    turn: 3,
    scope: "industry",
    industry: "Health & Wellness",
    category: "POLICY",
    impact: "HIGH",
    timeString: "10 mins ago",
    headline: "Major Health Insurer Announces Subsidies for Wellness Hardware",
    detail: "A leading private health provider will offer premium discounts to members using certified biometric devices, driving customer adoption rates.",
    relevantTraits: [],
    duration: 3,
    macroModifiers: {
      growthWeightModifier: 0.15,
      declineWeightModifier: -0.10
    }
  },
  {
    id: "news_metric_fraud",
    turn: 3,
    scope: "general",
    category: "FINANCIAL",
    impact: "HIGH",
    timeString: "1 hour ago",
    headline: "Auditing Firm Warns of Inflated Startup User Metrics",
    detail: "A major accounting firm reports that up to 30% of early-stage SaaS and subscription startups are overstating active user counts.",
    relevantTraits: ["inflated_metrics"]
  },
  {
    id: "news_serial_founders",
    turn: 3,
    scope: "general",
    category: "MARKETS",
    impact: "MEDIUM",
    timeString: "12 hours ago",
    headline: "Serial Founders Command Higher Valuations",
    detail: "Data shows that founders with at least one successful prior exit raise seed rounds at a 25% premium on average.",
    relevantTraits: ["solid_prior_exit"]
  },
  // --- TURN 4 EVENTS (Includes Circadian Trend and Talent Fluff) ---
  {
    id: "news_epigenetic_trend",
    turn: 4,
    scope: "industry",
    industry: "Health & Wellness",
    category: "MARKETS",
    impact: "MEDIUM",
    timeString: "1 hour ago",
    headline: "Viral Social Trend Sparks Surge in Epigenetic Bio-hacking",
    detail: "Public interest in DNA-matched wellness tools hits record highs. Active consumer demand shifts toward personalized supplements and wellness hardware.",
    relevantTraits: [],
    duration: 4,
    macroModifiers: {
      growthWeightModifier: 0.10,
      valueMultiplierModifier: 0.05
    }
  },
  {
    id: "news_talent_layoffs",
    turn: 4,
    scope: "general",
    category: "ECONOMY",
    impact: "LOW",
    timeString: "1 day ago",
    headline: "Tech Layoffs Expand Early-Stage Startup Talent Pool",
    detail: "Engineering and product managers departing legacy platforms are increasingly joining early-stage ventures, easing structural recruiting bottlenecks.",
    relevantTraits: []
  },
  {
    id: "news_key_man",
    turn: 4,
    scope: "general",
    category: "MANAGEMENT",
    impact: "HIGH",
    timeString: "4 hours ago",
    headline: "Startup Founders Struggle with Key Personnel Attrition",
    detail: "Venture analysts report an increase in startup operational failures when core software systems and intellectual properties are concentrated in one developer.",
    relevantTraits: ["key_man_risk"],
    duration: 3,
    macroModifiers: {
      declineWeightModifier: 0.15,
      volatileWeightModifier: 0.10
    }
  },
  {
    id: "news_pe_slowing",
    turn: 4,
    scope: "industry",
    industry: "Health & Wellness",
    category: "MARKETS",
    impact: "LOW",
    timeString: "2 days ago",
    headline: "Private Equity Inflow to Supplement Brands Slows Down",
    detail: "M&A activity declines as institutional players search for high-growth sectors outside nutrition.",
    relevantTraits: []
  },
  // --- TURN 5 EVENTS (Includes R&D Tax Credits) ---
  {
    id: "news_tax_credits",
    turn: 5,
    scope: "general",
    category: "POLICY",
    impact: "HIGH",
    timeString: "2 hours ago",
    headline: "New Federal R&D Tax Credits Enacted for Tech Startups",
    detail: "Bipartisan legislation allows early-stage companies to offset operational expenses against research tax credits, preserving cash runway for innovators.",
    relevantTraits: [],
    duration: 2,
    macroModifiers: {
      growthWeightModifier: 0.05,
      valueMultiplierModifier: 0.03
    }
  },
  {
    id: "news_retention_decay",
    turn: 5,
    scope: "general",
    category: "MARKETING",
    impact: "HIGH",
    timeString: "2 hours ago",
    headline: "Industry Audits Show Decaying Retention on Social Acquisition Channels",
    detail: "Marketing experts warn that while digital ad campaigns drive cheap trial conversions, consumer subscription churn by Month 2 has doubled.",
    relevantTraits: ["over_optimized_marketing"],
    duration: 4,
    macroModifiers: {
      declineWeightModifier: 0.25,
      growthWeightModifier: -0.15
    }
  },
  {
    id: "news_label_probe",
    turn: 5,
    scope: "industry",
    industry: "Health & Wellness",
    category: "REGULATORY",
    impact: "HIGH",
    timeString: "5 hours ago",
    headline: "State Attorneys General Launch Clean Label Investigation",
    detail: "Consumer protection agencies warn of imminent crackdowns on clean-label startups making wellness claims without clinical support.",
    relevantTraits: ["uncalculated_risk_taker", "questionable_legal_history"]
  }
];
