export const EVENT_TEMPLATES = [
  {
    id: "follow_on_round",
    type: "follow_on_request",
    triggerCondition: "trend_up",
    promptText: "Founder of {businessName} is raising a Series A round to accelerate growth. They are asking for a follow-on investment of {eventAsk} to maintain your equity ownership. If you decline, your position will be diluted.",
    options: [
      {
        label: "Invest {eventAsk}",
        effectType: "accept_follow_on"
      },
      {
        label: "Pass (Accept Dilution)",
        effectType: "decline_follow_on"
      }
    ]
  },
  {
    id: "buyout_offer_acquisition",
    type: "buyout_offer",
    triggerCondition: "trend_up",
    promptText: "A large competitor has made an acquisition offer for {businessName}. They are offering to buy out your shares for {buyoutAmount} in cash.",
    options: [
      {
        label: "Accept Offer",
        effectType: "accept_buyout"
      },
      {
        label: "Reject Offer",
        effectType: "reject_buyout"
      }
    ]
  },
  {
    id: "distress_cash_crunch",
    type: "distress_request",
    triggerCondition: "trend_down",
    promptText: "Founder of {businessName} reports a severe cash flow crisis due to supply chain issues. They require an emergency cash injection of {eventAsk} to stay afloat. If you decline, the company will file for bankruptcy.",
    options: [
      {
        label: "Inject {eventAsk}",
        effectType: "accept_distress"
      },
      {
        label: "Decline Funding (Write-Off)",
        effectType: "decline_distress"
      }
    ]
  }
];
