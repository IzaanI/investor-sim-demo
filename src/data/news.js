export const NEWS_BANK = [
  {
    id: "news_macro_rates",
    minTurn: 2,
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
    minTurn: 2,
    scope: "general",
    category: "ECONOMY",
    impact: "MEDIUM",
    timeString: "5 hours ago",
    headline: "Global Supply Chain Delays Continue",
    detail: "New disruptions in key shipping lanes expected to impact wellness hardware container shipping through next 4 months.",
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
    minTurn: 1,
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
    minTurn: 3,
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
    minTurn: 5,
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
    minTurn: 3,
    scope: "general",
    category: "MARKETS",
    impact: "MEDIUM",
    timeString: "6 hours ago",
    headline: "Venture Capital Funding Activity Rebounds",
    detail: "Early-stage investment rounds show a 15% increase in deal volume compared to last month, signaling renewed interest in high-growth startups.",
    relevantTraits: []
  },
  {
    id: "news_preventive_subsidies",
    minTurn: 3,
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
    minTurn: 2,
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
    minTurn: 1,
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
    minTurn: 3,
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
    minTurn: 4,
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
    minTurn: 4,
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
    minTurn: 4,
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
    minTurn: 3,
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
    minTurn: 2,
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
    minTurn: 4,
    scope: "industry",
    industry: "Health & Wellness",
    category: "REGULATORY",
    impact: "HIGH",
    timeString: "5 hours ago",
    headline: "State Attorneys General Launch Clean Label Investigation",
    detail: "Consumer protection agencies warn of imminent crackdowns on clean-label startups making wellness claims without clinical support.",
    relevantTraits: ["uncalculated_risk_taker", "questionable_legal_history"]
  },
  // ---------- FOOD & BEVERAGE NEWS ----------
  {
    id: "news_fb_aluminum",
    minTurn: 4,
    scope: "industry",
    industry: "Food & Beverage",
    category: "SUPPLY CHAIN",
    impact: "HIGH",
    timeString: "10 hours ago",
    headline: "Global Aluminum Shortage Hits Beverage Startups",
    detail: "A massive shortage in raw aluminum is driving up can production costs. Beverage startups face narrowing margins or delayed rollouts.",
    relevantTraits: [],
    duration: 3,
    macroModifiers: {
      declineWeightModifier: 0.15,
      valueMultiplierModifier: -0.05
    }
  },
  {
    id: "news_fb_tiktok",
    minTurn: 2,
    scope: "industry",
    industry: "Food & Beverage",
    category: "MARKETING",
    impact: "HIGH",
    timeString: "1 hour ago",
    headline: "Viral TikTok Food Trend Clears Grocery Shelves",
    detail: "A sudden viral video has driven unprecedented demand for artisan and unique pantry staples, boosting revenue for local F&B brands.",
    relevantTraits: ["over_optimized_marketing"],
    duration: 2,
    macroModifiers: {
      growthWeightModifier: 0.20,
      valueMultiplierModifier: 0.10
    }
  },
  {
    id: "news_fb_fda",
    minTurn: 1,
    scope: "industry",
    industry: "Food & Beverage",
    category: "REGULATORY",
    impact: "HIGH",
    timeString: "3 hours ago",
    headline: "FDA Announces Surprise Inspections on Ghost Kitchens",
    detail: "Regulators are clamping down on decentralized cooking operations after a series of health code violations, causing panic among virtual brands.",
    relevantTraits: ["uncalculated_risk_taker", "questionable_legal_history"],
    duration: 4,
    macroModifiers: {
      declineWeightModifier: 0.25,
      growthWeightModifier: -0.10
    }
  }
];
