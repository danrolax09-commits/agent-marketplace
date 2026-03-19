export const STRIPE_PRICES = {
  starter: 'price_1TChYPFE7rCAiPw0aSP8Czfr',
  professional: 'price_1TChYPFE7rCAiPw029KS9bMN',
  enterprise: 'price_1TChYPFE7rCAiPw0L5oAlYyu',
};

export const PRICING_TIERS = [
  {
    name: 'Starter',
    priceId: 'price_1TChYPFE7rCAiPw0aSP8Czfr',
    price: 19,
    description: 'Perfect for getting started',
    features: [
      'Basic features',
      'Up to 100 requests/month',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    priceId: 'price_1TChYPFE7rCAiPw029KS9bMN',
    price: 49,
    description: 'Most popular for teams',
    features: [
      'All Starter features',
      'Unlimited requests',
      'Priority support',
      'Advanced analytics',
      'Team collaboration',
    ],
  },
  {
    name: 'Enterprise',
    priceId: 'price_1TChYPFE7rCAiPw0L5oAlYyu',
    price: 99,
    description: 'For large-scale operations',
    features: [
      'All Professional features',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
      'On-premise option',
    ],
  },
];
