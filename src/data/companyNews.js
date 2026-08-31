/**
 * Dynamic company-specific news templates.
 * Applied per-holding each turn based on valuation momentum.
 * Tokens: {{companyName}}, {{market}}, {{product}}, {{customerNoun}}
 */

export const COMPANY_NEWS_TEMPLATES = {
  positive: [
    // --- Original positive templates ---
    {
      category: "SPOTLIGHT",
      headline: "{{companyName}} CEO goes viral from an honorable edit after making bold statements in a recent interview.",
      detail: "The viral edit has gained massive traction online, giving {{companyName}} a huge boost in brand awareness among younger demographics.",
    },
    {
      category: "MARKET",
      headline: "{{companyName}} gains a cult following after their mascot accidentally crashes a live weather broadcast.",
      detail: "The hilarious mishap has endeared the brand to millions, resulting in a surprising surge of loyal new customers.",
    },
    {
      category: "TALENT",
      headline: "{{companyName}} becomes the first company to appoint a golden retriever to its board of directors.",
      detail: "The PR stunt was a massive success. Morale is up, and investors are strangely confident in the dog's strategic vision.",
    },
    {
      category: "MOMENTUM",
      headline: "{{companyName}}'s waitlist crashes their servers after they promise a free pizza party to the first 1,000 customers.",
      detail: "The chaotic launch proved that people will do anything for free pizza. Demand is off the charts.",
      actionable: true,
      actionableDetail: "Demand is outpacing supply. This may be a window to propose follow-on funding before the next round closes.",
    },
    {
      category: "PRESS",
      headline: "{{companyName}}'s CEO is named 'Person Most Likely to Survive a Zombie Apocalypse' in a popular tech magazine.",
      detail: "The bizarre award has oddly increased consumer trust, with many stating they want their products made by survivors.",
    },
    {
      category: "PARTNERSHIPS",
      headline: "{{companyName}} unexpectedly partners with a trendy boba tea chain, launching a controversial but highly successful flavor.",
      detail: "The strange collaboration has sparked endless online debates, driving both morbid curiosity and massive sales.",
      actionable: true,
      actionableDetail: "Unconventional partnerships can yield high rewards. Monitor the next 1-2 quarters to see if this hype translates into sustained growth.",
    },

    // --- New positive templates: SPOTLIGHT ---
    {
      category: "SPOTLIGHT",
      headline: "{{companyName}} becomes one of the most talked-about young companies in the {{market}} space.",
      detail: "A wave of industry attention has put {{companyName}} on the radar of customers, competitors, and potential investors alike."
    },
    {
      category: "SPOTLIGHT",
      headline: "Local business community rallies behind {{companyName}} after an impressive product demonstration.",
      detail: "The demonstration generated enthusiastic reactions from attendees, with several local operators reportedly expressing interest in working with the company."
    },
    {
      category: "SPOTLIGHT",
      headline: "{{companyName}} draws an unusually large crowd at an otherwise quiet industry event.",
      detail: "The company reportedly attracted more attention than several much larger competitors, giving the young brand an unexpected moment in the spotlight."
    },
    {
      category: "SPOTLIGHT",
      headline: "Founder of {{companyName}} seen hitting a nasty clip in local Rocket League tournament.",
      detail: "The clip has been shared thousands of times, driving significant traffic to {{companyName}}'s website."
    },
    {
      category: "SPOTLIGHT",
      headline: "'Never Too Young' campaign launched by {{companyName}} offers paid internships to children aged 8 and up.",
      detail: "While slightly confusing for labor lawyers, the campaign has received overwhelming praise for 'fostering young talent'."
    },
    {
      category: "SPOTLIGHT",
      headline: "{{companyName}} wins over a notoriously difficult-to-impress panel of {{market}} judges.",
      detail: "Judges praised the company's approach and execution, although some questioned whether the enthusiasm will translate into meaningful commercial results."
    },

    // --- New positive templates: MARKET ---
    {
      category: "MARKET",
      headline: "{{companyName}} experiences a surge in demand after a popular TikToker mistakenly credits them for fixing their posture.",
      detail: "Despite {{product}} having nothing to do with posture, the viral claim has led to a massive influx of new orders."
    },
    {
      category: "MARKET",
      headline: "{{companyName}} appears to be benefiting from a growing niche within the {{market}} market.",
      detail: "What was once considered a narrow customer segment is showing signs of becoming a meaningful commercial opportunity."
    },
    {
      category: "MARKET",
      headline: "Analysts identify {{companyName}} as an early beneficiary of changing {{market}} preferences.",
      detail: "Consumer and business behavior appears to be moving in the company's direction, though it remains unclear whether the shift will last."
    },
    {
      category: "MARKET",
      headline: "{{companyName}} finds itself operating in one of the {{market}} sector's fastest-growing niches.",
      detail: "Industry demand is expanding quickly, giving the company a favorable environment for growth — assuming it can keep pace."
    },
    {
      category: "MARKET",
      headline: "A surprisingly large number of {{customerNoun}} appear to be asking the same question: 'Where can I get {{product}}?'",
      detail: "Search interest and customer inquiries have risen sharply, suggesting growing awareness of {{companyName}} and its offering."
    },
    {
      category: "MARKET",
      headline: "Industry analysts admit they may have underestimated the appeal of {{companyName}}.",
      detail: "Early skepticism surrounding the company appears to be fading as customers continue to show interest in its offering."
    },

    // --- New positive templates: TALENT ---
    {
      category: "TALENT",
      headline: "{{companyName}}'s job postings go viral because they offer unlimited snacks, nap pods, and 'zero required meetings'.",
      detail: "The unconventional benefits package has resulted in thousands of highly qualified applicants begging to join the team."
    },
    {
      category: "TALENT",
      headline: "Former {{market}} veteran leaves established competitor to join {{companyName}}.",
      detail: "The hire brings years of industry experience to the young company and could help management navigate the challenges of scaling."
    },
    {
      category: "TALENT",
      headline: "{{companyName}} reportedly has a waiting list of applicants hoping to join the team.",
      detail: "The company has become an unexpectedly attractive destination for talent, despite its relatively small size."
    },
    {
      category: "TALENT",
      headline: "{{companyName}} founder personally recruits a former industry rival to join the company.",
      detail: "The unusual hire has raised eyebrows, but insiders say the two executives have complementary expertise."
    },
    {
      category: "TALENT",
      headline: "{{companyName}} employee reportedly turns down a major corporate offer to stay with the startup.",
      detail: "The decision has been interpreted as a strong vote of confidence in the company's future, although one employee's decision is hardly a market forecast."
    },
    {
      category: "TALENT",
      headline: "{{companyName}}'s newest hire reportedly has more industry experience than the entire founding team combined.",
      detail: "The addition could significantly strengthen the company's capabilities, particularly as management prepares for its next stage of growth."
    },

    // --- New positive templates: MOMENTUM ---
    {
      category: "MOMENTUM",
      headline: "{{companyName}} achieves record profits after launching limited edition brain rot merchandise with company branding.",
      detail: "The quirky product variation has become a surprise hit, flying off the virtual shelves faster than they can produce it."
    },
    {
      category: "MOMENTUM",
      headline: "{{companyName}} sells out of inventory in hours after being featured in a popular meme page's 'starter pack'.",
      detail: "The ironic endorsement has translated into very unironic revenue, significantly boosting the company's growth.",
      actionable: true,
      actionableDetail: "Sudden sales acceleration could justify revisiting {{companyName}}'s growth assumptions before its next funding round."
    },
    {
      category: "MOMENTUM",
      headline: "{{companyName}} reportedly reaches profitability months ahead of its original forecast.",
      detail: "The company appears to be generating positive cash flow sooner than management initially expected, providing additional room to invest in growth.",
      actionable: true,
      actionableDetail: "Earlier-than-expected profitability reduces the company's dependence on outside capital and may strengthen its negotiating position in future funding."
    },
    {
      category: "MOMENTUM",
      headline: "{{companyName}}'s {{product}} suddenly becomes a favorite among an unexpected group of {{customerNoun}}.",
      detail: "The company wasn't actively targeting this segment, but demand has grown quickly enough that management is reportedly considering a dedicated offering."
    },
    {
      category: "MOMENTUM",
      headline: "{{companyName}} reportedly turns away new customers for the first time.",
      detail: "Capacity constraints have forced the company to prioritize existing customers while it works to increase production and fulfillment capacity.",
      actionable: true,
      actionableDetail: "Demand is clearly exceeding current capacity. Additional capital could accelerate expansion, but scaling too quickly may create operational problems."
    },
    {
      category: "MOMENTUM",
      headline: "A single weekend sends {{companyName}}'s website traffic through the roof.",
      detail: "The source of the sudden spike remains unclear, but management says orders increased alongside the surge in visitors.",
      actionable: true,
      actionableDetail: "Determine whether the traffic spike represents genuine demand or a temporary viral event before assuming the new sales level is sustainable."
    },
    {
      category: "MOMENTUM",
      headline: "{{companyName}} quietly crosses a milestone management once described as 'completely unrealistic.'",
      detail: "The company has now surpassed the benchmark that its founders once considered an ambitious long-term goal."
    },

    // --- New positive templates: PRESS ---
    {
      category: "PRESS",
      headline: "{{companyName}} lands on a prominent publication's list of {{market}} companies to watch.",
      detail: "The recognition gives the company another credibility boost and could attract customers, employees, and potential investors."
    },
    {
      category: "PRESS",
      headline: "A review calling {{companyName}}'s {{product}} 'the only thing keeping me sane' by a sleep-deprived parent sends sales skyrocketing.",
      detail: "The highly relatable and dramatic review has struck a chord with the public, creating massive buzz for the company."
    },
    {
      category: "PRESS",
      headline: "{{companyName}} founder appears on a popular business podcast and refuses to give a straight answer about future plans.",
      detail: "The interview generated plenty of discussion online, although listeners remain divided on whether the founder's evasiveness was strategic or accidental."
    },
    {
      category: "PRESS",
      headline: "{{companyName}} unexpectedly becomes the subject of a lengthy online debate.",
      detail: "Critics and supporters have spent days arguing over the company's approach. Neither side appears remotely interested in letting the discussion end."
    },
    {
      category: "PRESS",
      headline: "Business columnist calls {{companyName}}'s {{product}} 'the most interesting idea I've seen all year.'",
      detail: "The enthusiastic write-up has generated a noticeable increase in attention, though praise from one columnist is hardly a guarantee of commercial success."
    },
    {
      category: "PRESS",
      headline: "{{companyName}} founder's awkward interview becomes strangely popular online.",
      detail: "The interview was hardly the polished media appearance the company had planned, but clips have circulated widely and awareness of the brand is climbing."
    },

    // --- New positive templates: PARTNERSHIPS ---
    {
      category: "PARTNERSHIPS",
      headline: "{{companyName}} partners with a respected regional operator to bring {{product}} to new customers.",
      detail: "The partnership gives {{companyName}} access to an established distribution network without requiring the company to build one from scratch.",
      actionable: true,
      actionableDetail: "The partnership could materially expand distribution while limiting upfront costs. Watch for evidence that the new channel converts into recurring revenue."
    },
    {
      category: "PARTNERSHIPS",
      headline: "A major supplier is so charmed by {{companyName}}'s handwritten thank-you notes that they offer a lifetime discount.",
      detail: "The old-school etiquette has surprisingly secured them a massive competitive advantage in the supply chain."
    },
    {
      category: "PARTNERSHIPS",
      headline: "{{companyName}} signs a pilot program with one of the {{market}} industry's largest companies.",
      detail: "The agreement is relatively small for now, but a successful trial could open the door to a much larger commercial relationship.",
      actionable: true,
      actionableDetail: "The pilot is promising but unproven. A successful rollout could significantly change {{companyName}}'s growth prospects."
    },
    {
      category: "PARTNERSHIPS",
      headline: "{{companyName}} announces a partnership that seems almost suspiciously perfect for its {{product}}.",
      detail: "The two companies appear to complement each other unusually well, although the financial terms of the agreement remain private."
    },
    {
      category: "PARTNERSHIPS",
      headline: "{{companyName}} lands a partnership with a company considerably larger than itself.",
      detail: "The deal gives the young business a credibility boost and access to resources it would have struggled to build independently."
    },
    {
      category: "PARTNERSHIPS",
      headline: "{{companyName}} announces a bizarre partnership that somehow makes perfect sense.",
      detail: "Industry observers initially questioned the pairing, but the two companies appear to serve complementary customer bases."
    },
    {
      category: "PARTNERSHIPS",
      headline: "{{companyName}} reportedly rejected a partnership offer after negotiations became 'too complicated.'",
      detail: "Management insists the decision was made in the company's best interests, although the other party appears to disagree.",
      actionable: true,
      actionableDetail: "The failed partnership isn't necessarily bad news, but it may signal that {{companyName}} is becoming selective about how it scales."
    }
  ],
  negative: [
    // --- Original negative templates ---
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
      actionableDetail: "High leadership churn is one of the strongest early warning signs of organizational dysfunction. Review your exposure before next quarter.",
    },
    {
      category: "SOCIAL",
      headline: "A disgruntled ex-employee of {{companyName}} takes to social media with serious allegations.",
      detail: "A former team member posted a detailed thread accusing {{companyName}}'s founder of misrepresenting performance metrics to investors. The post is gaining traction.",
      actionable: true,
      actionableDetail: "Reputation risk of this magnitude can accelerate valuation decline if left unaddressed. Consider whether you want exposure here heading into next quarter.",
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

    // --- New negative templates: RUMOR ---
    {
      category: "RUMOR",
      headline: "Rumors circulate that founder of {{companyName}} wants to sue Elon Musk for defamation after his recent X post.",
      detail: "An apparently hostile post from Elon Musk has sent social media into a frenzy after allegedly criticizing {{companyName}}'s business practices. Sources claim the founder is 'exploring every legal option,' while {{companyName}} has issued no official statement.",
    },
    {
      category: "RUMOR",
      headline: "Rumors swirl that {{companyName}}'s CEO has been banned from a local Costco.",
      detail: "An anonymous source claims the CEO was involved in an unspecified incident at a Costco near {{companyName}}'s headquarters. The nature of the alleged incident remains unclear, but the rumor has spread rapidly among employees.",
    },
    {
      category: "RUMOR",
      headline: "Sources claim {{companyName}}'s founder accidentally posted a derogatory comment from the company social media account instead of personal one.",
      detail: "TikTok users believe the founder deleted an inappropriate comment after discovering which account was actually being used to engage with a post online.",
      actionable: true,
      actionableDetail: "Incidents like this reflect poorly upon company reputation. Is this damage irreversible or an honest misunderstanding?",
    },

    // --- New negative templates: INTERNAL ---
    {
      category: "INTERNAL",
      headline: "Whistleblowers claim that {{companyName}} has a racially discriminatory hiring and firing process.",
      detail: "Several former employees have come forward alleging that hiring, promotion, and termination decisions at {{companyName}} have been influenced by skin color. The company says it takes the allegations seriously and is reviewing the claims.",
      actionable: true,
      actionableDetail: "Allegations of systemic discrimination can create significant legal and reputational risks. Association with this company may be dangerous if such activity continues.",
    },
    {
      category: "INTERNAL",
      headline: "{{companyName}} employees reportedly spend 14% of their workday arguing about what the company's logo is supposed to look like.",
      detail: "An internal survey allegedly found that branding disagreements have consumed an extraordinary amount of employee time. Management reportedly insists the issue is 'nearly resolved,' despite the debate entering its sixth month.",
    },
    {
      category: "INTERNAL",
      headline: "Internal documents reveal {{companyName}} has a 47-slide presentation explaining why it needs fewer presentations.",
      detail: "Employees reportedly discovered the deck while cleaning up an internal drive. The presentation allegedly concludes that excessive meetings and PowerPoints are harming productivity, before recommending a meeting to discuss the findings.",
    },

    // --- New negative templates: SOCIAL ---
    {
      category: "SOCIAL",
      headline: "Video of {{companyName}} CEO getting 'ragebaited' by Walmart employee goes viral.",
      detail: "A confrontation between {{companyName}}'s CEO and a Walmart employee has exploded after the employee recognized the executive and began asking increasingly provocative questions about the company's products.",
    },
    {
      category: "SOCIAL",
      headline: "{{companyName}} executive confesses to sending explicit pictures to a 17-year-old.",
      detail: "The executive claims that he was 'rounding up' and that a 24-year age gap is completely okay and acceptable.",
      actionable: true,
      actionableDetail: "Incidents like this reflect poorly upon company reputation. Is this damage irreversible or an honest misunderstanding?",
    },
    {
      category: "SOCIAL",
      headline: "{{companyName}}'s CEO gets ratioed after attempting to explain the company's product using a meme.",
      detail: "A social media post from the CEO intended to make {{companyName}} appear relatable has instead triggered a wave of criticism and parody posts. The original post has since been deleted.",
    },

    // --- New negative templates: MARKET ---
    {
      category: "MARKET",
      headline: "{{companyName}} sales official accidentally approves an order with an extra 0 at the end.",
      detail: "A supplies request for {{companyName}} costing 10 times what was needed was inadvertently ordered in the last week. Leadership hopes that demand will meet supply.",
      actionable: true,
      actionableDetail: "Supply chain mistakes can leave product supply and customer demand disproportionate. Leverage additional funding or reconsider holding shares in this company.",
    },
    {
      category: "MARKET",
      headline: "{{companyName}} launches a new product so expensive that analysts suspect it was priced by accident.",
      detail: "The company's newest offering has entered the market at a price dramatically above competing products. {{companyName}} insists the premium reflects its positioning, though early sales appear weak.",
    },
    {
      category: "MARKET",
      headline: "{{companyName}} discovers that its biggest competitor is apparently just three guys in a garage.",
      detail: "A tiny startup has begun taking market share from {{companyName}} despite having a fraction of its staff and resources. Analysts reason whether real rivalry could stir.",
    },

    // --- New negative templates: LEGAL ---
    {
      category: "LEGAL",
      headline: "{{companyName}} receives a cease-and-desist from a man who claims the company stole his idea after hearing him talk about it at a Tim Hortons.",
      detail: "An Alberta man has filed a legal complaint alleging that {{companyName}}'s flagship product was based on an idea he casually discussed near one of the company's employees. {{companyName}} says the allegations have no merit.",
    },
    {
      category: "LEGAL",
      headline: "{{companyName}} threatens to take legal action against an 11 year old girl.",
      detail: "A young girl is facing potential copyright claims after she posts online videos trying to replicate {{product}}.",
      actionable: true,
      actionableDetail: "This company is taking proprietary technology very seriously. Is this threat justifiable or an overreaction?",
    },
    {
      category: "LEGAL",
      headline: "{{companyName}} reportedly spends more on lawyers arguing over a comma than the disputed contract is worth.",
      detail: "A bizarre contractual dispute has reportedly escalated into a legal battle over the interpretation of a single sentence. Both sides insist the wording is extremely important.",
    },

    // --- New negative templates: OPERATIONS ---
    {
      category: "OPERATIONS",
      headline: "{{companyName}} reportedly loses an entire pallet of products and discovers it was delivered to the CEO's house.",
      detail: "A logistics error allegedly resulted in a large shipment being delivered to an executive's private residence. The company has not explained why nobody noticed the missing inventory for several days.",
    },
    {
      category: "OPERATIONS",
      headline: "{{companyName}}'s AI warehouse reportedly refuses to work after being told to 'kill itself' by an ex-employee.",
      detail: "A malfunction in {{companyName}}'s automated fulfillment system has caused widespread delays. Employees have reportedly resorted to manually processing orders while engineers investigate the issue.",
    },
    {
      category: "OPERATIONS",
      headline: "{{companyName}} shares its entire inventory spreadsheet with the wrong Josh Hawkins.",
      detail: "Security concerns float after an inventory leak with a random person having an identical name to an employee. Permissions are being revoked and potential changes to the database are being investigated.",
      actionable: true,
      actionableDetail: "Unintended data breaches may ensue if incidents like this reoccur. Is this an honest mistake or a result of poor company hiring policy and practices?",
    },
  ]
};
