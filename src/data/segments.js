/**
 * 3-Slot Segment Pool for the Tone-Based Pitch Engine.
 *
 * Each segment belongs to one SLOT (intro, body, close) and is tagged
 * with the TONES it supports. The assembly engine filters segments based on
 * the archetype's allowed tones, enabling high reusability across multiple founder types.
 */

export const SEGMENTS = {
  // ─── INTRO (Hook + Problem) ────────────────────────────────────────────────
  intro: [
    // --- CONFIDENT TONE ---
    {
      id: "intro_confident_1",
      tones: ["confident"],
      text: "I built {{companyName}} because everyone in {{market}} is still optimizing for a customer that no longer exists."
    },
    {
      id: "intro_confident_2",
      tones: ["confident"],
      text: "Most companies treat {{painPoint}} as an inconvenience, but we see it as a category waiting to be created."
    },
    {
      id: "intro_confident_3",
      tones: ["confident"],
      text: "I didn't start {{companyName}} to compete in {{market}}; I started it to make the current alternatives completely obsolete."
    },
    {
      id: "intro_confident_4",
      tones: ["confident"],
      text: "If you look closely at {{market}}, you'll see a massive gap where {{painPoint}} has been ignored for far too long."
    },
    {
      id: "intro_confident_user_1",
      tones: ["confident"],
      text: "{{painPoint}} isn't going away on its own. Fortunately, we already have a solution that's proving itself."
    },
    {
      id: "intro_confident_user_2",
      tones: ["confident"],
      text: "I know investors hear dozens of ideas every week. I genuinely believe {{companyName}} deserves to be one you'll remember."
    },
    {
      id: "intro_confident_user_3",
      tones: ["confident"],
      text: "Our team didn't come here with a dream—we came with results."
    },
    {
      id: "intro_confident_user_4",
      tones: ["confident"],
      text: "There are opportunities that look good on paper, and there are opportunities that change industries. I believe this is the latter."
    },
    {
      id: "intro_confident_user_5",
      tones: ["confident"],
      text: "I wouldn't be sitting in this room if I didn't believe {{companyName}} could become a leader in {{market}}."
    },

    // --- METHODICAL TONE ---
    {
      id: "intro_methodical_1",
      tones: ["methodical"],
      text: "Customer discovery confirmed that {{customerNoun}} are spending hours on workarounds because no clean solution exists for {{painPoint}}."
    },
    {
      id: "intro_methodical_2",
      tones: ["methodical"],
      text: "The current solutions for {{painPoint}} are fragmented and have terrible satisfaction scores; the market is begging for a workflow fix."
    },
    {
      id: "intro_methodical_3",
      tones: ["methodical"],
      text: "Our technical audits indicate that the core issue in {{market}} is {{painPoint}}, which affects over 70% of target users."
    },
    {
      id: "intro_methodical_4",
      tones: ["methodical"],
      text: "We spent months collecting usage logs, and the evidence is clear: {{customerNoun}} have no reliable way to manage {{painPoint}}."
    },

    // --- AGGRESSIVE TONE ---
    {
      id: "intro_aggressive_1",
      tones: ["aggressive"],
      text: "We're not here to educate the market; {{customerNoun}} are already spending millions addressing {{painPoint}} and getting burned."
    },
    {
      id: "intro_aggressive_2",
      tones: ["aggressive"],
      text: "Incumbents in {{market}} are moving too slow, and we've identified a massive gap to capture their market share."
    },
    {
      id: "intro_aggressive_user_1",
      tones: ["aggressive"],
      text: "Listen here man, {{painPoint}} has been plaguing the {{market}} industry for as long as you and I can remember."
    },
    {
      id: "intro_aggressive_user_2",
      tones: ["aggressive"],
      text: "I’m not here to waste your time, and I’m definitely not here to waste mine. We both know that {{painPoint}} is a problem, and I am coming to you with a solution."
    },
    {
      id: "intro_aggressive_user_3",
      tones: ["aggressive"],
      text: "If you know {{customerNoun}} in the {{market}} space, then you would be dumber than a rock not to invest in our company."
    },
    {
      id: "intro_aggressive_3",
      tones: ["aggressive"],
      text: "Let's be real: the existing products in {{market}} are a joke, and {{customerNoun}} are tired of wasting money on them."
    },
    {
      id: "intro_aggressive_4",
      tones: ["aggressive"],
      text: "Every single player in {{market}} is ignoring {{painPoint}}, and I am here to take their market share."
    },

    // --- HUMOROUS TONE ---
    {
      id: "intro_humorous_1",
      tones: ["humorous"],
      text: "I started {{companyName}} out of pure frustration because I couldn't find a single tool in {{market}} that actually worked for me."
    },
    {
      id: "intro_humorous_2",
      tones: ["humorous"],
      text: "When I realized all my peers faced the same constant struggle with {{painPoint}}, I stopped looking for solutions and built one."
    },
    {
      id: "intro_humorous_user_1",
      tones: ["humorous"],
      text: "The terrorist attacks of 9/11 were actually carried out in February. Now that I have your attention, my company is {{companyName}} and we want help with {{painPoint}}."
    },
    {
      id: "intro_humorous_user_2",
      tones: ["humorous"],
      text: "Would you believe me if I told you that sticking a fork into an outlet increases your luck for the rest of the year? Of course not. But you better believe instead that {{painPoint}} has been a problem for decades."
    },
    {
      id: "intro_humorous_user_3",
      tones: ["humorous"],
      text: "If you are like me, the smell of feet makes you feel a certain kind of way. Even if you aren’t like me, you’ve probably heard of {{painPoint}}."
    },
    {
      id: "intro_humorous_3",
      tones: ["humorous"],
      text: "They say money can't buy happiness, but it can fund {{companyName}}, which is basically the same thing when you look at {{painPoint}}."
    },
    {
      id: "intro_humorous_4",
      tones: ["humorous"],
      text: "I was told that {{market}} was too crowded, but then I saw how bad everyone else was at handling {{painPoint}}."
    },

    // --- NERVOUS TONE ---
    {
      id: "intro_nervous_1",
      tones: ["nervous"],
      text: "Hi, sorry if I'm a bit rushed... I started {{companyName}} because I was genuinely worried that nobody in {{market}} was fixing {{painPoint}}."
    },
    {
      id: "intro_nervous_2",
      tones: ["nervous"],
      text: "To be completely honest, looking at how bad {{painPoint}} is for {{customerNoun}} actually kept me up at night, which is why I'm here."
    },
    {
      id: "intro_nervous_3",
      tones: ["nervous"],
      text: "Um, I hope I'm explaining this right, but {{market}} has a huge blind spot when it comes to {{painPoint}}."
    },
    {
      id: "intro_nervous_4",
      tones: ["nervous"],
      text: "I didn't actually plan on becoming a founder, but seeing {{customerNoun}} struggle with {{painPoint}} just felt too important to ignore."
    },

    // --- CASUAL TONE ---
    {
      id: "intro_casual_1",
      tones: ["casual"],
      text: "Hey, what's up? So look, we built {{companyName}} because the way everyone handles {{painPoint}} right now is just completely broken."
    },
    {
      id: "intro_casual_2",
      tones: ["casual"],
      text: "Honestly, I was just hanging out talking to {{customerNoun}} and realized that nobody in {{market}} was actually fixing {{painPoint}}."
    },
    {
      id: "intro_casual_3",
      tones: ["casual"],
      text: "It's pretty crazy when you think about it, but the whole {{market}} industry is basically just ignoring {{painPoint}}."
    },
    {
      id: "intro_casual_4",
      tones: ["casual"],
      text: "Yeah, so the idea for {{companyName}} basically came from being super annoyed by {{painPoint}} every single day."
    },
    // --- USER SUBMITTED AGGRESSIVE ---
    {
      id: "intro_agg_user_1",
      tones: ["aggressive"],
      text: "I'm not asking whether {{painPoint}} is a real problem—we both know it is. The only question is who's going to profit from solving it."
    },
    {
      id: "intro_agg_user_2",
      tones: ["aggressive"],
      text: "There are people who complain about {{painPoint}}, and there are people who build companies around fixing it. We chose the second option."
    },
    {
      id: "intro_agg_user_3",
      tones: ["aggressive"],
      text: "Every day someone loses money because of {{painPoint}}. I'm here because we're done watching it happen."
    },
    {
      id: "intro_agg_user_4",
      tones: ["aggressive"],
      text: "You don't build a company like {{companyName}} by playing it safe, and you don't invest in one by overthinking it."
    },
    // --- USER SUBMITTED METHODICAL ---
    {
      id: "intro_meth_user_1",
      tones: ["methodical"],
      text: "Our goal wasn't to reinvent the industry overnight—it was to build a better solution through careful iteration."
    },
    {
      id: "intro_meth_user_2",
      tones: ["methodical"],
      text: "The data consistently pointed us toward the same conclusion: {{painPoint}} remains an overlooked problem in {{market}}."
    },
    {
      id: "intro_meth_user_3",
      tones: ["methodical"],
      text: "Building {{companyName}} started with one simple question: why hasn't anyone solved {{painPoint}} properly?"
    },
    {
      id: "intro_meth_user_4",
      tones: ["methodical"],
      text: "The opportunity became obvious once we analyzed how {{customerNoun}} currently deal with {{painPoint}}."
    },
    // --- USER SUBMITTED NERVOUS ---
    {
      id: "intro_nerv_user_1",
      tones: ["nervous"],
      text: "I know there are probably companies much bigger than ours pitching today, but {{painPoint}} is a real problem and I think we have a solution."
    },
    {
      id: "intro_nerv_user_2",
      tones: ["nervous"],
      text: "{{companyName}} is the name, solving {{painPoint}} is the game! Sorry, that was cringey."
    },
    {
      id: "intro_nerv_user_3",
      tones: ["nervous"],
      text: "Thanks for giving me your time. My company helps those dealing with {{painPoint}} and I really think we have a winner here!"
    },
    {
      id: "intro_nerv_user_4",
      tones: ["nervous"],
      text: "My name is {{companyName}} - I mean my company name is {{companyName}}. Sorry. We are in the {{market}} industry and would like your funding."
    },
    // --- USER SUBMITTED CASUAL ---
    {
      id: "intro_cas_user_1",
      tones: ["casual"],
      text: "So here's the idea. I started because I got tired of dealing with {{painPoint}} myself. If you know any {{customerNoun}} dealing with this, then you gotta keep listening."
    },
    {
      id: "intro_cas_user_2",
      tones: ["casual"],
      text: "Most people don't wake up planning to start a company, and honestly, neither did I. But here we are. {{companyName}} is my company, and I want to share it with someone who knows the pain of {{painPoint}}."
    },
    {
      id: "intro_cas_user_3",
      tones: ["casual"],
      text: "The more we talked to {{customerNoun}}, the more obvious it became that somebody needed to fix this."
    },
    {
      id: "intro_cas_user_4",
      tones: ["casual"],
      text: "I promise I'll keep this simple. We found a problem in the {{market}} sector, built something people actually wanted, and now we're looking to grow."
    },
    // --- USER SUBMITTED HUMOROUS ---
    {
      id: "intro_hum_user_1",
      tones: ["humorous"],
      text: "If a guy came to you claiming they had the solution to {{painPoint}}, would you hear them out? Perfect. I'm that guy, bro. Let me cook."
    },
    {
      id: "intro_hum_user_2",
      tones: ["humorous"],
      text: "She said, \"it's either me or {{companyName}}.\" Let's just say I have a lot more blanket on me when I sleep than before. I'm serious about {{painPoint}}, man."
    },
    {
      id: "intro_hum_user_3",
      tones: ["humorous"],
      text: "You are never gonna believe me, but we were actually friends back in 2nd grade! I've seen the same old problem in the {{market}} industry ever since, and I want us to partner up just like old times."
    },
    {
      id: "intro_hum_user_4",
      tones: ["humorous"],
      text: "From the ripe age of 5 years old, I've been dreaming about becoming an astronaut. That is unfortunately still a dream, and I started {{companyName}} instead."
    },
    {
      id: "intro_hum_user_5",
      tones: ["humorous"],
      text: "F students are the inventors. I dropped out of high school because I know {{customerNoun}} have been struggling with {{painPoint}} for too long."
    }
  ],

  // ─── BODY (Solution + Traction) ────────────────────────────────────────────
  body: [
    // --- CONFIDENT TONE ---
    {
      id: "body_confident_1",
      tones: ["confident"],
      text: "We created {{product}} as our initial wedge. We've already unlocked {{growthStr}} growth and see a massive platform opportunity ahead."
    },
    {
      id: "body_confident_2",
      tones: ["confident"],
      text: "We built {{product}} to solve the problem at a structural level. Early indicators suggest we are defining the future of how this industry operates."
    },
    {
      id: "body_confident_3",
      tones: ["confident"],
      text: "We built {{product}} to establish a new standard. Our early metric of {{metric}} proves that the market is responding."
    },
    {
      id: "body_confident_4",
      tones: ["confident"],
      text: "{{companyName}} is scaling rapidly with {{product}}. We've already hit {{growthStr}} growth without spending a dollar on traditional ads."
    },
    {
      id: "body_confident_user_1",
      tones: ["confident"],
      text: "Since launching {{product}}, we've generated {{revenueStr}} while building a loyal customer base. The demand is there—we're simply looking for the resources to meet it."
    },
    {
      id: "body_confident_user_2",
      tones: ["confident"],
      text: "{{product}} has already helped us achieve {{metric}}, and every month we're seeing more {{customerNoun}} choose us over existing alternatives."
    },
    {
      id: "body_confident_user_3",
      tones: ["confident"],
      text: "The response to {{product}} has exceeded even our own expectations. After growing by {{growthStr}}, we're confident the next stage of expansion is well within reach."
    },
    {
      id: "body_confident_user_4",
      tones: ["confident"],
      text: "We didn't build {{product}} just because it was an interesting idea, we built it because {{customerNoun}} genuinely needed a better solution. The results so far have only reinforced that belief."
    },

    // --- METHODICAL TONE ---
    {
      id: "body_methodical_1",
      tones: ["methodical"],
      text: "Our product is {{product}}. We are currently at {{metric}} generating {{revenueStr}} with a defensible payback period."
    },
    {
      id: "body_methodical_2",
      tones: ["methodical"],
      text: "We built {{product}} to reduce workflow friction. Retention at 90 days is above industry average, and we've hit {{metric}} organically."
    },
    {
      id: "body_methodical_3",
      tones: ["methodical"],
      text: "We developed {{product}} after strict lab validation. The initial release reached {{metric}} with a steady {{revenueStr}}."
    },
    {
      id: "body_methodical_4",
      tones: ["methodical"],
      text: "Our data pipeline validates {{product}} under real‑world loads. We have achieved {{growthStr}} growth with consistent cohort retention."
    },

    // --- AGGRESSIVE TONE ---
    {
      id: "body_aggressive_1",
      tones: ["aggressive"],
      text: "We launched {{product}} to overwhelming demand. We're growing faster than we can hire and are on track to dominate {{market}}."
    },
    {
      id: "body_aggressive_2",
      tones: ["aggressive"],
      text: "We shipped {{product}} early and iterated fast. Already, we're pulling in massive weekly transaction volumes from top‑tier users."
    },
    {
      id: "body_aggressive_user_1",
      tones: ["aggressive"],
      text: "We built {{product}}. I know what you are thinking, this is like every other company in the space, but we’ve generated {{revenueStr}} in the last 2 months. How about now?"
    },
    {
      id: "body_aggressive_user_2",
      tones: ["aggressive"],
      text: "{{companyName}} has already hit {{metric}} since releasing {{product}}. If that doesn't immediately sound like music to your ears, maybe you should get them checked."
    },
    {
      id: "body_aggressive_user_3",
      tones: ["aggressive"],
      text: "After launching {{product}}, {{companyName}} has already grown by {{growthStr}}. I know you’ve never seen growth like this in the {{market}} industry before."
    },
    {
      id: "body_aggressive_3",
      tones: ["aggressive"],
      text: "We built {{product}} to win. We've locked in {{metric}} already and our competitors have no way to match our velocity."
    },
    {
      id: "body_aggressive_4",
      tones: ["aggressive"],
      text: "Our execution on {{product}} speaks for itself. We've hit {{revenueStr}} in record time and we aren't slowing down."
    },

    // --- HUMOROUS TONE ---
    {
      id: "body_humorous_1",
      tones: ["humorous"],
      text: "The product is {{product}}, and it's built simply. The {{metric}} we've reached organically shows that people really value what we do."
    },
    {
      id: "body_humorous_2",
      tones: ["humorous"],
      text: "We focused entirely on making {{product}} work cleanly. Our organic growth is {{growthStr}} and our early cohorts just don't churn."
    },
    {
      id: "body_humorous_user_1",
      tones: ["humorous"],
      text: "Introducing: {{product}}. If we can gain 12 million more customers, we can reach 1 billion in revenue by next year! For now though, we have a steady {{revenueStr}} in revenue."
    },
    {
      id: "body_humorous_user_2",
      tones: ["humorous"],
      text: "We are scaling {{product}} faster than Covid-19 infected the masses back in the pandemic. A company growth rate of {{growthStr}} backs this!"
    },
    {
      id: "body_humorous_user_3",
      tones: ["humorous"],
      text: "I know for a fact that you have never heard of {{product}}. If you have, then ours is better. We literally hit {{metric}} last month."
    },
    {
      id: "body_humorous_3",
      tones: ["humorous"],
      text: "We created {{product}} because my co‑founder said it was impossible. We now have {{metric}} proving him wrong."
    },
    {
      id: "body_humorous_4",
      tones: ["humorous"],
      text: "Our secret weapon is {{product}}. It's working so well that we've reached {{growthStr}} growth, and my mom even uses it now."
    },

    // --- NERVOUS TONE ---
    {
      id: "body_nervous_1",
      tones: ["nervous"],
      text: "So, we built {{product}}. I was honestly surprised, but we've somehow already hit {{growthStr}} growth."
    },
    {
      id: "body_nervous_2",
      tones: ["nervous"],
      text: "I know we're still early, but after launching {{product}}, we managed to reach {{metric}} which feels pretty validating."
    },
    {
      id: "body_nervous_3",
      tones: ["nervous"],
      text: "Our main thing is {{product}}. It's a bit overwhelming, but we're currently generating {{revenueStr}} and trying to keep up."
    },
    {
      id: "body_nervous_4",
      tones: ["nervous"],
      text: "We spent a long time perfecting {{product}} because we didn't want to fail. Thankfully, our users love it and we're at {{metric}}."
    },

    // --- CASUAL TONE ---
    {
      id: "body_casual_1",
      tones: ["casual"],
      text: "We just threw together {{product}} to see what would happen, and things got kind of wild—we're already doing {{revenueStr}}."
    },
    {
      id: "body_casual_2",
      tones: ["casual"],
      text: "Basically, we launched {{product}} and people just naturally gravitated to it. We hit {{metric}} without even trying that hard."
    },
    {
      id: "body_casual_3",
      tones: ["casual"],
      text: "Our whole vibe is just making {{product}} as easy to use as possible. It's working out pretty well, we're seeing {{growthStr}} growth."
    },
    {
      id: "body_casual_4",
      tones: ["casual"],
      text: "So we put {{product}} out there, and the reception has been super chill. We're currently sitting at {{metric}}."
    }
  ],

  // ─── CLOSE (The Ask + Urgency) ─────────────────────────────────────────────
  close: [
    // --- CONFIDENT TONE ---
    {
      id: "close_confident_1",
      tones: ["confident"],
      text: "This capital buys us product depth and distribution before a well-funded competitor figures out what we already know."
    },
    {
      id: "close_confident_2",
      tones: ["confident"],
      text: "If you believe where this market is going, this is the right window to partner with us."
    },
    {
      id: "close_confident_3",
      tones: ["confident"],
      text: "The opportunity in {{market}} is clear, and we have the right team to capture it."
    },
    {
      id: "close_confident_4",
      tones: ["confident"],
      text: "We are positioned to lead this space. I invite you to join {{companyName}} before the valuation adjusts."
    },
    {
      id: "close_confident_user_1",
      tones: ["confident"],
      text: "I'd love to have you involved as we build something that lasts."
    },
    {
      id: "close_confident_user_2",
      tones: ["confident"],
      text: "I think this is the beginning of something much bigger, and I hope you'll be part of it."
    },
    {
      id: "close_confident_user_3",
      tones: ["confident"],
      text: "Whether you decide to invest today or not, I believe you'll be hearing about {{companyName}} again."
    },
    {
      id: "close_confident_user_4",
      tones: ["confident"],
      text: "This isn't about chasing quick wins, it's about building a company that will still matter years from now."
    },

    // --- METHODICAL TONE ---
    {
      id: "close_methodical_1",
      tones: ["methodical"],
      text: "The use of funds is mapped out to hit cash‑flow positivity within six quarters on these growth rates."
    },
    {
      id: "close_methodical_2",
      tones: ["methodical"],
      text: "This raise secures our 18‑month runway and puts us in a highly leveraged position for our next institutional milestone."
    },
    {
      id: "close_methodical_3",
      tones: ["methodical"],
      text: "This round provides the 18‑month runway required to scale our operations in {{market}}."
    },
    {
      id: "close_methodical_4",
      tones: ["methodical"],
      text: "Our financial projections show a clear path to profitability once this capital is deployed."
    },

    // --- AGGRESSIVE TONE ---
    {
      id: "close_aggressive_1",
      tones: ["aggressive"],
      text: "We're closing this round in the next few weeks; if you want a seat at the table before it's full, let's move."
    },
    {
      id: "close_aggressive_2",
      tones: ["aggressive"],
      text: "We have strong term‑sheet interest, but I'm looking for partners who understand the velocity we're operating at."
    },
    {
      id: "close_aggressive_user_1",
      tones: ["aggressive"],
      text: "Deals like this don’t stick around for long. I’d recommend investing as soon as possible if I were you…"
    },
    {
      id: "close_aggressive_user_2",
      tones: ["aggressive"],
      text: "My team knows that {{companyName}} is going to make us richer than Elon Musk, Jeff Bezos, and even Shivin Jain. Join us while you still can."
    },
    {
      id: "close_aggressive_user_3",
      tones: ["aggressive"],
      text: "Life is filled with regrets, and passing on this company will be one of them. I guarantee it."
    },
    {
      id: "close_aggressive_3",
      tones: ["aggressive"],
      text: "This deal is moving fast. If you want in on {{companyName}}, I need a commitment by next week."
    },
    {
      id: "close_aggressive_4",
      tones: ["aggressive"],
      text: "We are raising to scale what already works. You can either back us now or watch us pass you by."
    },

    // --- HUMOROUS TONE ---
    {
      id: "close_humorous_1",
      tones: ["humorous"],
      text: "I don't know everything, but I promise I won't waste your capital or your trust."
    },
    {
      id: "close_humorous_2",
      tones: ["humorous"],
      text: "If you think this bet makes sense, I'd value having your experience in the room to help us scale."
    },
    {
      id: "close_humorous_user_1",
      tones: ["humorous"],
      text: "{{companyName}} is like my ex-wife; it will take-off before you know it and leave nothing behind. Hold my hand and we can witness it together!"
    },
    {
      id: "close_humorous_user_2",
      tones: ["humorous"],
      text: "I drove an incredibly far distance to pitch this to you, so I’d appreciate if we ended this meeting with you handing over a cheque! Just kidding, take your time."
    },
    {
      id: "close_humorous_user_3",
      tones: ["humorous"],
      text: "I know a smart investor when I see one. Make your decision and I’ll tell you if there is one in sight."
    },
    {
      id: "close_humorous_3",
      tones: ["humorous"],
      text: "If you don't invest in {{companyName}}, my developer might cry, and we really can't afford the downtime."
    },
    {
      id: "close_humorous_4",
      tones: ["humorous"],
      text: "I promise this investment will perform better than my last crypto portfolio. Let's make a deal."
    },

    // --- NERVOUS TONE ---
    {
      id: "close_nervous_1",
      tones: ["nervous"],
      text: "We're raising this round because, honestly, we need the capital to scale before we get crushed by demand."
    },
    {
      id: "close_nervous_2",
      tones: ["nervous"],
      text: "If you invest in {{companyName}}, I promise I will work day and night to make sure your money is safe and growing."
    },
    {
      id: "close_nervous_3",
      tones: ["nervous"],
      text: "I know I might not sound like a typical founder, but I really believe in this, and we'd be honored to partner with you."
    },
    {
      id: "close_nervous_4",
      tones: ["nervous"],
      text: "We just need this funding to secure our runway. I'd love to answer any questions you have, assuming I didn't forget anything!"
    },

    // --- CASUAL TONE ---
    {
      id: "close_casual_1",
      tones: ["casual"],
      text: "We're just looking for some cool partners to help us scale {{companyName}} and ride this wave."
    },
    {
      id: "close_casual_2",
      tones: ["casual"],
      text: "If you guys are down, we'd love to bring you on board. The numbers look great and we're just getting started."
    },
    {
      id: "close_casual_3",
      tones: ["casual"],
      text: "So yeah, that's pretty much it. Let's grab a coffee or something if you want to be a part of this round."
    },
    {
      id: "close_casual_4",
      tones: ["casual"],
      text: "No pressure at all, but we're closing this round soon and would be stoked to have you guys involved."
    }
  ]
};
