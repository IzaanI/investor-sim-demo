export const TRAITS = {
  // ─── RISK TRAITS ───────────────────────────────────────────────────────────
  questionable_legal_history: {
    id: "questionable_legal_history",
    label: "Questionable Legal History",
    severity: "severe",
    category: "legal",
    backgroundClue: [
      "Public records show the founder was named in multiple civil disputes over the past seven years.",
      "Mentions of founder early in career suggest potential history of abusing employees in the workplace to increase operational efficiency.",
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
      "Industry insiders recall the founder taking loans to buy stock when experiencing resource shortages.",
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
      "Experts in industry claim that they have only seen reported sales margins this high in the top 1% of companies.",
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
      "Early business documentation indicates that 40% of the executive team consists of high-school dropouts with big dreams.",
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
      "Founder tends to do the work themself when team performance is not up to standard.",
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
      "Online testimonials reveal a 50/50 split of 5 star and 1 star reviews.",
      "A consumer review aggregator shows strong initial ratings followed by a sharp drop-off in reviews after 60 days."
    ],
    outcomeNudge: { growth: -0.1, decline: 0.1, volatile: 0.1 }
  },
  history_of_burn_out: {
    id: "history_of_burn_out",
    label: "History of Burnout",
    severity: "severe",
    category: "personality",
    backgroundClue: [
      "Public records show the founder stepped away from their last two ventures citing 'exhaustion' before the two-year mark.",
      "Interview with founder's partner reveals that it is usual to only get 4 hours of sleep per night because 'the company needs me.'",
      "Industry whispers suggest the founder struggles to delegate and frequently bottlenecks critical operations."
    ],
    outcomeNudge: { growth: -0.15, decline: 0.20, volatile: 0.10 }
  },
  toxic_culture: {
    id: "toxic_culture",
    label: "Toxic Culture Rumours",
    severity: "severe",
    category: "process",
    backgroundClue: [
      "A quick search on employee review sites reveals multiple allegations of a hostile work environment and high turnover.",
      "Glassdoor insight suggests that the number of layoffs for performance reasons is less than the number of employees who leave for other reasons.",
      "Three senior engineers have departed in the last six months, citing fundamental disagreements with leadership."
    ],
    outcomeNudge: { growth: -0.20, decline: 0.30, volatile: 0.15 }
  },

  // ─── NEUTRAL PROCESS TRAITS ────────────────────────────────────────────────
  shops_deal: {
    id: "shops_deal",
    label: "Shops the Deal",
    severity: "neutral",
    category: "process",
    backgroundClue: [
      "Multiple sources in the investor community confirm this deal has been circulating for a few months.",
      "Similar pitches that occured recently suggest that the founder is only interested in an investor that believes in the product.",
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
      "Publications around company culture indicate that founder strives to maintain 0-debt for as long as possible.",
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
  solo_founder: {
    id: "solo_founder",
    label: "Solo Founder",
    severity: "neutral",
    category: "structure",
    backgroundClue: [
      "The company was incorporated by a solo entrepreneur with no intentions to hire a large executive team.",
      "All equity is concentrated in a single individual, with no co-founder or technical lead on the cap table."
    ],
    outcomeNudge: { growth: -0.05, decline: 0.0, volatile: 0.05 }
  },
  pivot_history: {
    id: "pivot_history",
    label: "Pivot History",
    severity: "neutral",
    category: "history",
    backgroundClue: [
      "The company's original domain name changed 8 months ago after discovering a company had a similar name.",
      "When introducing new products or services, the company prefers to pivot instead of persisting if there are no short-term forecastable results.",
      "Archived versions of their website show they initially targeted enterprise before recently pivoting to consumer."
    ],
    outcomeNudge: { growth: 0.05, decline: 0.05, volatile: 0.10 }
  },

  // ─── POSITIVE TRAITS ───────────────────────────────────────────────────────
  solid_prior_exit: {
    id: "solid_prior_exit",
    label: "Solid Prior Exit",
    severity: "positive",
    category: "history",
    backgroundClue: [
      "The founder's previous company was acquired three years ago. The transaction returned capital to early investors.",
      "A public records check reveals at least 2 members of the C-suite in this business have been involved in successful exits.",
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
      "Previous executives confirm that company plans to pursue unique routes compared to others in the industry.",
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
      "Marketing department insiders suggest that operating costs are unlike those they've ever seen.",
      "Financial audits confirm a customer acquisition payback period under three months."
    ],
    outcomeNudge: { growth: 0.10, decline: -0.10, volatile: 0.00 }
  },
  deep_domain_expertise: {
    id: "deep_domain_expertise",
    label: "Deep Domain Expertise",
    severity: "positive",
    category: "technology",
    backgroundClue: [
      "The founder has spent over a decade in this specific niche, holding senior technical roles at two major competitors.",
      "Old colleagues claim that the founder contributed to ground-breaking research in the sector.",
      "Publications in industry journals confirm the founder is a recognized thought leader in this specialized field."
    ],
    outcomeNudge: { growth: 0.20, decline: -0.10, volatile: -0.05 }
  },
  strong_advisory_board: {
    id: "strong_advisory_board",
    label: "Strong Advisory Board",
    severity: "positive",
    category: "structure",
    backgroundClue: [
      "The cap table includes two highly respected industry veterans who are actively providing strategic guidance.",
      "Formal filings reveal a board of directors with a proven track record of shepherding companies through IPOs."
    ],
    outcomeNudge: { growth: 0.15, decline: -0.15, volatile: -0.05 }
  }
};
