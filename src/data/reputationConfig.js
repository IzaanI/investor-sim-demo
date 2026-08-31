export const REPUTATION_THRESHOLDS = [
  { threshold: 20,  cashMin: 50000,   cashMax: 100000  },
  { threshold: 40,  cashMin: 250000,  cashMax: 300000  },
  { threshold: 60,  cashMin: 450000,  cashMax: 550000  },
  { threshold: 80,  cashMin: 700000,  cashMax: 800000  },
  { threshold: 100, cashMin: 900000,  cashMax: 1000000 },
];

export const REPUTATION_TIERS = [
  { min: 0,   max: 19,  label: "Unknown Operator" },
  { min: 20,  max: 39,  label: "Rising Fund"       },
  { min: 40,  max: 59,  label: "Established VC"    },
  { min: 60,  max: 79,  label: "Top-Tier Investor" },
  { min: 80,  max: 99,  label: "Legendary"         },
  { min: 100, max: 100, label: "Apex"               },
];

export function getReputationTier(rep) {
  return REPUTATION_TIERS.find(t => rep >= t.min && rep <= t.max) || REPUTATION_TIERS[0];
}