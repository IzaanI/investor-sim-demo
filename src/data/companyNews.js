/**
 * Dynamic company-specific news templates.
 * Applied per-holding each turn based on valuation momentum.
 * Tokens: {{companyName}}, {{market}}
 */

export const COMPANY_NEWS_TEMPLATES = {
  positive: [
    {
      category: "SPOTLIGHT",
      headline: "Upcoming {{market}} company {{companyName}} seen making strong first impressions at regional tradeshows.",
      detail: "Industry contacts report that {{companyName}}'s booth drew significant foot traffic and real buzz among buyers and distributors. Early signs of brand momentum.",
    },
    {
      category: "MARKET",
      headline: "{{companyName}} quietly building a loyal following in the crowded {{market}} space.",
      detail: "Organic word-of-mouth appears to be doing a lot of work for {{companyName}}. Customer retention data, when shared publicly, paints a compelling picture.",
    },
    {
      category: "TALENT",
      headline: "{{companyName}} makes a marquee senior hire, poaching a seasoned {{market}} executive.",
      detail: "The move signals management is getting serious about scaling. Industry observers see it as a sign of institutional confidence from the founding team.",
    },
    {
      category: "MOMENTUM",
      headline: "Waitlists for {{companyName}}'s core product reportedly growing faster than supply.",
      detail: "Constrained supply may be a short-term headache, but demand of this nature is the kind of problem most founders dream about.",
      actionable: true,
      actionableDetail: "Demand is outpacing supply. This may be a window to propose follow-on funding before the next round closes.",
    },
    {
      category: "PRESS",
      headline: "{{companyName}} founder featured in a prominent {{market}} industry publication.",
      detail: "The profile piece highlights an unconventional go-to-market strategy that appears to be working. Brand legitimacy in competitive verticals is hard to quantify — but this helps.",
    },
    {
      category: "PARTNERSHIPS",
      headline: "{{companyName}} signs a multi-year distribution partnership with a regional retail chain.",
      detail: "The deal significantly expands physical retail presence and is expected to materially accelerate revenue recognition over the coming months.",
      actionable: true,
      actionableDetail: "Distribution deals of this scope take time to show up in financials. The next 1-2 months will be the real test — but this is a strong signal.",
    },
  ],
  negative: [
    {
      category: "RUMOR",
      headline: "Founder of {{companyName}} spotted in the Bahamas on a lavish vacation shortly after closing a funding round.",
      detail: "Photos circulating on social media show the founder of {{companyName}} at a luxury resort just weeks after securing investor capital. Sources call it a 'team retreat,' but the optics are raising eyebrows.",
    },
    {
      category: "INTERNAL",
      headline: "Sources inside {{companyName}} report unusually high turnover among senior leadership.",
      detail: "Three executives have reportedly departed {{companyName}} in the past two months. Culture and strategic alignment concerns are being raised quietly.",
      actionable: true,
      actionableDetail: "High leadership churn is one of the strongest early warning signs of organizational dysfunction. Review your exposure before next month.",
    },
    {
      category: "SOCIAL",
      headline: "A disgruntled ex-employee of {{companyName}} takes to social media with serious allegations.",
      detail: "A former team member posted a detailed thread accusing {{companyName}}'s founder of misrepresenting performance metrics to investors. The post is gaining traction.",
      actionable: true,
      actionableDetail: "Reputation risk of this magnitude can accelerate valuation decline if left unaddressed. Consider whether you want exposure here heading into next month.",
    },
    {
      category: "MARKET",
      headline: "{{companyName}} seen running deep discount promotions — analysts question demand strength.",
      detail: "Discounts of this size, this early, often indicate softer-than-expected organic demand. {{companyName}} has not offered an official explanation for the pricing strategy.",
    },
    {
      category: "LEGAL",
      headline: "{{companyName}} quietly settles a supplier dispute with undisclosed terms.",
      detail: "Court records show {{companyName}} reached a settlement with a former logistics partner. The terms are sealed, but the legal distraction at this stage raises questions.",
    },
    {
      category: "OPERATIONS",
      headline: "Product delays at {{companyName}} push back a key launch to an unspecified future date.",
      detail: "What was announced as an imminent product release has been quietly shelved pending 'additional refinement.' Insiders suggest engineering timelines were significantly underestimated.",
    },
  ]
};
