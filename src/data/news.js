export const NEWS_BANK = [
  {
    id: "news_macro_rates",
    minTurn: 2,
    scope: "general",
    category: "POLICY",
    impact: "MEDIUM",
    timeString: "1 day ago",
    headline: "Central Bank Holds Interest Rates Steady",
    detail: "Banks suggest interest rates might drop next year as prices stop rising so fast. Businesses are reacting positively to the stability.",
    relevantTraits: []
  },
  {
    id: "news_supply_chain",
    minTurn: 2,
    scope: "general",
    category: "ECONOMY",
    impact: "MEDIUM",
    timeString: "5 hours ago",
    headline: "Shipping Delays Impact Businesses Worldwide",
    detail: "New complications with international shipping routes are expected to delay deliveries of equipment and hardware for the next six months.",
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
    headline: "Government Cracks Down on Fake Health Claims",
    detail: "Regulators are warning wellness startups that they will face massive fines if they make medical promises without real scientific proof.",
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
    headline: "Investors Start Running Deeper Background Checks on Founders",
    detail: "After several high-profile startup scams, major investors are demanding strict legal background checks before handing over any money.",
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
    headline: "Specialty Health and Fitness Businesses are Booming",
    detail: "People are spending more of their extra cash on premium gym memberships and specialized health products instead of traditional shopping.",
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
    headline: "Startup Funding Bounces Back",
    detail: "The number of investments in new businesses has jumped 15% since last quarter, showing that investors are eager to fund young startups again.",
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
    headline: "Major Health Insurance Company Announces Subsidies for Fitness Devices",
    detail: "A major insurance provider is now offering discounts to customers who use approved health trackers, giving a huge boost to fitness tech companies.",
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
    headline: "Report Warns that Startups are Increasingly Inflating Customer Metrics",
    detail: "A major accounting group found that up to 30% of new software companies might be lying about how many active customers they actually have.",
    relevantTraits: ["inflated_metrics"]
  },
  {
    id: "news_serial_founders",
    minTurn: 1,
    scope: "general",
    category: "MARKETS",
    impact: "MEDIUM",
    timeString: "12 hours ago",
    headline: "2nd-Time Founders With Past Success Are Raising More Money Than Ever Before",
    detail: "Data shows that entrepreneurs who have already built and sold a successful company are getting 25% more money from investors.",
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
    headline: "Viral Social Trend Sparks Surge in Personalized Health Tech",
    detail: "Public interest in DNA-matched wellness tools hits record highs. People are rushing to buy personalized supplements and health tracking hardware.",
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
    headline: "Big Tech Layoffs Diversify Hiring Pool for Startups",
    detail: "Engineers leaving massive tech companies are now joining smaller startups, making it much easier for young companies to find great talent.",
    relevantTraits: []
  },
  {
    id: "news_key_man",
    minTurn: 4,
    scope: "general",
    category: "MANAGEMENT",
    impact: "HIGH",
    timeString: "4 hours ago",
    headline: "Recent Economic Downturn Hits Companies With Single Key Developers Hardest",
    detail: "Analysts report that many startups are failing because they rely entirely on a single key developer to handle all of their technology.",
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
    headline: "Large Private Equity Firms Are Investing Less in Nutrition Than Ever Before",
    detail: "Large investment firms are buying fewer nutrition companies as they start looking for faster-growing industries to invest in.",
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
    headline: "New Tax Breaks Give Tech Startups a Helpful Boost",
    detail: "Newly passed laws are giving generous tax discounts to small businesses that invent new tech, helping them save money to survive longer.",
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
    headline: "Companies Are Losing Customers Brought In by Social Media Ads",
    detail: "Marketing experts warn that while social media ads get cheap sign-ups, most of those new customers cancel their subscriptions almost immediately.",
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
    headline: "State Governments Investigate 'Clean' Health Brands",
    detail: "Consumer protection groups are threatening to crack down on health startups that sell 'clean' products but can't back up their health claims with real science.",
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
    minTurn: 1,
    scope: "general",
    category: "INFLUENCERS",
    impact: "LOW",
    timeString: "Yesterday",
    headline: "YouTuber tryShiv Busted for Creating Fake Accounts to Inflate Subscribers",
    detail: "Young immigrant YouTuber exposed for creating countless emails to artificially increase subscriber count."
  },
  {
    id: "fluff_hayden",
    minTurn: 1,
    scope: "general",
    category: "INFLUENCERS",
    impact: "LOW",
    timeString: "Yesterday",
    headline: "Popular YouTuber Hayden Recieves Backlash after Accidentally Posting a Video of Himself Playing League of Legends",
    detail: "The young content creator is now facing criticism for not being a 'true gamer' and is being called out for his taste in video games."
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
