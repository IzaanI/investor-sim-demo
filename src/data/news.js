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
    detail: "New disruptions in key shipping lanes expected to impact wellness hardware container shipping through next 2 quarters.",
    relevantTraits: [],
    duration: 6,
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
    detail: "Early-stage investment rounds show a 15% increase in deal volume compared to last quarter, signaling renewed interest in high-growth startups.",
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
    duration: 6,
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
    duration: 3,
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
    duration: 6,
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
    duration: 3,
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
    duration: 6,
    macroModifiers: {
      declineWeightModifier: 0.25,
      growthWeightModifier: -0.10
    }
  },
  {
    id: "markets_003",
    minTurn: 3,
    scope: "general",
    category: "COMPETITION",
    impact: "MEDIUM",
    timeString: "5 hours ago",
    headline: "Major Corporation Enters Several Startup Markets",
    detail: "Industry analysts expect increased competition as established firms expand into traditionally startup-dominated sectors."
  },
  {
    id: "expertise_001",
    minTurn: 2,
    scope: "general",
    category: "INDUSTRY",
    impact: "LOW",
    timeString: "8 hours ago",
    headline: "Industry Veterans Continue Outperforming New Entrants",
    detail: "Companies led by experienced specialists appear better equipped to navigate changing markets.",
    relevantTraits: ["deep_domain_expertise"]
  },
  {
    id: "risk_001",
    minTurn: 4,
    scope: "general",
    category: "MARKETS",
    impact: "MEDIUM",
    timeString: "1 hour ago",
    headline: "Investors Grow Wary of High-Risk Expansion Strategies",
    detail: "Aggressive growth plans have come under increased scrutiny following several high-profile failures.",
    relevantTraits: ["uncalculated_risk_taker"]
  },
  {
    id: "culture_001",
    minTurn: 5,
    scope: "general",
    category: "WORKPLACE",
    impact: "MEDIUM",
    timeString: "4 hours ago",
    headline: "Employee Satisfaction Emerges as Key Startup Success Metric",
    detail: "Studies continue to link strong workplace culture with higher long-term company performance.",
    relevantTraits: ["toxic_culture_rumors"]
  },
  {
    id: "flavor_002",
    minTurn: 3,
    scope: "general",
    category: "BUSINESS",
    impact: "LOW",
    timeString: "Today",
    headline: "Study Finds Startup Founders Average 6.2 Hours of Sleep",
    detail: "Experts disagree on whether the lack of sleep causes innovation or simply comes with it."
  },
  {
    id: "flavor_003",
    minTurn: 2,
    scope: "general",
    category: "WORKPLACE",
    impact: "LOW",
    timeString: "Yesterday",
    headline: "Debate Continues Over Whether Standing Desks Actually Help",
    detail: "After years of research, scientists remain unable to agree whether standing desks meaningfully improve workplace health."
  },
  {
    id: "fluff_subscription_fatigue",
    minTurn: 1,
    scope: "general",
    category: "MARKETS",
    impact: "LOW",
    timeString: "10 hours ago",
    headline: "Experts Predict AI takeover by year 2030",
    detail: "Several analysts argue how long before artificial entities start defying human orders."
  },
  {
    id: "fluff_wellness_cure",
    minTurn: 2,
    scope: "general",
    category: "HEALTH",
    impact: "LOW",
    timeString: "Yesterday",
    headline: "Rumors Circulate that Health and Wellness Products may Become Obsolete Permanently",
    detail: "Medical professionals working on miracle cure that fixes all health related issues."
  },
  {
    id: "fluff_ceo_bankruptcy",
    minTurn: 1,
    scope: "general",
    category: "BUSINESS",
    impact: "LOW",
    timeString: "2 hours ago",
    headline: "CEO Brayden Mitch Files for Bankruptcy after Gambling away Life Savings",
    detail: "Young founder loses big after putting his house and car on black."
  },
  {
    id: "fluff_cs_graduate",
    minTurn: 1,
    scope: "general",
    category: "CAREERS",
    impact: "LOW",
    timeString: "Today",
    headline: "Recent University Graduate Spencer McGoon will make you Rethink Pursuing Computer Science",
    detail: "\"I've been applying for 8 months and can't find anything. AI is taking over, dawg.\""
  },
  {
    id: "fluff_youtuber_busted",
    minTurn: 2,
    scope: "general",
    category: "INFLUENCERS",
    impact: "LOW",
    timeString: "Yesterday",
    headline: "YouTuber tryShiv Busted for Creating Fake Accounts to Inflate Subscribers",
    detail: "Young immigrant YouTuber created countless emails to artificially increase subscriber count."
  },
  {
    id: "fluff_battle_bettesworth",
    minTurn: 3,
    scope: "general",
    category: "WORLD",
    impact: "LOW",
    timeString: "3 days ago",
    headline: "New War Titled Battle of Bettesworth Seems Across the Horizon",
    detail: "Experts claim tensions in the Mid-West may escalate uncontrollably."
  },
  {
    id: "fluff_crypto_tool",
    minTurn: 1,
    scope: "general",
    category: "FINTECH",
    impact: "LOW",
    timeString: "Today",
    headline: "Cameroonian Entrepreneur Ab. U Baker Builds Bleeding Edge Crypto Tool",
    detail: "Deployable Bitcoin wallet extension projected to release early next year."
  }
];
