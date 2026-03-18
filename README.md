# Agent Marketplace

A SaaS platform for buying and selling AI agents.

## Features

- **Browse Agents** - Thousands of production-ready AI agents
- **Instant Purchase** - Secure Stripe integration
- **Deploy** - API-first, integrate anywhere
- **Monitor** - Real-time analytics and earnings

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setup

1. Create Stripe products and prices for agents ($4.99, $9.99, $19.99)
2. Set environment variables:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

3. Deploy to Vercel:
   ```bash
   npm install -g vercel
   vercel
   ```

## Monetization Strategy

- **Commission**: 15% of each agent sale
- **Premium listings**: $29/month to feature your agent
- **API access**: $99/month for unlimited agent access
- **White-label**: $499/month

Expected revenue: $2-5K/month with 100+ agents.

## Architecture

- **Frontend**: Next.js 16 + React 19
- **Backend**: Next.js API Routes
- **Payments**: Stripe Checkout + Payment Links
- **Deployment**: Vercel
