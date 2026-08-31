export const NEGOTIATION_PROFILES = {
  visionary: {
    maxTolerance: 0.15,
    counterBias: 0.3,
    rejectBias: 0.7,
    dialogue: {
      accept: ["I'm glad you see the vision. Let's change the world.", "That's a fair valuation for the future we're building. Deal.", "Agreed. I look forward to working together to make this a reality.", "You see it. I like that. Let's build something ridiculous together and show everyone what this can become.", "Deal. Your wallet has officially joined the mission, and I think you're going to be very happy you came along.", "Deal! I can't wait to show you what we're capable of. This company means a lot to me, and we're only getting started.", "Absolutely. This is just the beginning, and I genuinely believe you're going to be glad you believed in us this early."],
      counter: ["I can't compromise my vision for that valuation, but I'll meet you at {val}.", "I really want this to work, but the best I can do is {val}.", "I know what this is worth. My final offer is {val}."],
      reject: ["You clearly don't understand what we're building here. If we can't find common ground, I bid you farewell.", "I'm afraid that I can't give that much of my company away. I'll find a believer elsewhere.", "Quite frankly, I don't think you see the potential here. I must decline your offer."]
    }
  },
  operator: {
    maxTolerance: 0.20,
    counterBias: 0.8,
    rejectBias: 0.2,
    dialogue: {
      accept: ["Hmm, I suppose this could work. I will make use of these funds right away.", "Looks like you did your homework. You got yourself a deal!", "That works for our runway model. Let's do it.", "Haha, that's exactly the equity I wanted to give up. Deal.", "That works within our projections and gives us enough room to execute the next phase. Agreed.", "The numbers check out, and the terms are reasonable from our perspective. Let's proceed."],
      counter: ["My financial models don't support that dip. I can counter at {val}.", "That drops our runway too low. Let's adjust to {val}.", "I've run the math, and the best I can do without jeopardizing operations is {val}."],
      reject: ["That valuation mathematically doesn't work for our growth phase. No deal.", "It doesn't take a genius to see that asking for that much equity is ridiculous. I'll take my business elsewhere.", "It seems like you don't believe in our business model. I am rescinding my offer."]
    }
  },
  hustler: {
    maxTolerance: 0.30,
    counterBias: 0.9,
    rejectBias: 0.1,
    dialogue: {
      accept: ["You drive a hard bargain, but I like it. Deal.", "Alright, alright. You got yourself a deal.", "Fair enough. Let's make some money.", "Now that's a number I can respect. Deal. You just bought yourself a front-row seat to what we're about to build.", "You drive a hard bargain. I like that. Deal, and let's see if you can keep up once we start moving."],
      counter: ["Come on, you're killing me here! Let's shake on {val}.", "I like the hustle, but I can't go that low. How about {val}?", "You're squeezing me! Let's meet at {val}.", "Trying to make it interesting, huh? I can do {val}, but that's my limit."],
      reject: ["If I wanted to hear someone insult my business, I would have just pitched to my mom. I'm outta here, man", "I didn't come here to give away my company for free. Do us both a favour and get lost...", "That's a joke, right? Good luck finding a better deal.", "Do I need to clean my ears or did you really just ask for that much? Get outta here."]
    }
  },
  first_time_founder: {
    maxTolerance: 0.40,
    counterBias: 0.4,
    rejectBias: 0.6,
    dialogue: {
      accept: ["Wow, okay! Thank you so much for believing in us!", "Yes, absolutely. We won't let you down.", "Wait, actually? I mean, yes! Do I have to sign something or how does it work?", "Deal! Seriously, thank you. You have no idea how much I needed this, and I promise we'll make every dollar count.", "YES. Deal. I was starting to think I'd have to sell my couch, so believe me when I say you just saved my week.", "Oh—yeah! That's, um, that's actually great. I wasn't sure we'd get there, but I'm really happy we did. Deal!", "Okay! Yeah. I think that's fair, and honestly I'm just relieved we found something that works for both of us.", "Deal. My accountant is going to be thrilled, my team is going to celebrate, and I'm probably going to pretend I wasn't nervous."],
      counter: ["Um, I was really hoping for closer to our ask... could we do {val}?", "That's a bit lower than I promised my team. Is {val} okay?", "If we drop to {val}, I think we can still make it work?", "I know this might seem like a lot to ask, but could we meet at {val}?"],
      reject: ["I... I can't give up that much of my company this early. I'm sorry.", "My advisors warned me about predators - like as in people who want to rip you off. I have to pass.", "This doesn't feel right. I think I'll look for other funding."]
    }
  },
  the_friend: {
    maxTolerance: 0.25,
    counterBias: 0.6,
    rejectBias: 0.4,
    dialogue: {
      accept: ["Awesome! I knew I could count on you.", "I actually don't mind that offer. Sign the contract big boy, sign the contract!", "Now that is what I call a good offer. Let's make it happen.", "Yeah, I'm good with that. I think we've got something here, so let's make this thing happen.", "You know what? I can live with that. We're in, and I'm excited to see where we can take this together.", "Honestly, I was expecting you to offer me exposure and a handshake. This is considerably better. Deal."],
      counter: ["I'd love to partner, but that's a bit steep. Let's do {val}, deal?", "I can't go quite that low, buddy. Let's meet at {val}.", "How about we split the difference at {val}?"],
      reject: ["I really thought we were on the same page. Guess not. See ya man.", "That's way too low, man. We should stay in touch, but I'm going to have to pass.", "Listen, I don't think we are seeing eye to eye on this. I have to decline but I appreciate the offer."]
    }
  },
  academic: {
    maxTolerance: 0.15,
    counterBias: 0.7,
    rejectBias: 0.3,
    dialogue: {
      accept: ["The empirical data supports this valuation. I accept.", "Oh my goodness! Yes! I need this!.", "I suppose we can make do with those terms. Let's shake on it.", "According to my calculations, this is a fair compromise. I accept.", "That's a reasonable valuation given our current trajectory and available data. I'm comfortable moving forward.", "I believe that's a defensible position based on our current fundamentals. Agreed, let's move forward."],
      counter: ["Based on my peer-reviewed models, {val} is the mathematically sound compromise.", "I cannot deviate that far from our thesis. I propose {val}.", "That discount margin is statistically unacceptable. I can offer {val}."],
      reject: ["This offer is fundamentally flawed. I don't believe you see this company for what it truely is...", "I refuse to compromise my life's work for an insulting valuation.", "The logic here is absent. I'm withdrawing my pitch."]
    }
  }
};
