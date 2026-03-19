import { NextRequest, NextResponse } from 'next/server';
import { stripe as getStripe } from '@/app/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, priceId } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Missing priceId' },
        { status: 400 }
      );
    }

    // Create checkout session using Stripe Payment Links for better compatibility
    const stripeClient = getStripe();
    const paymentLink = await stripeClient.paymentLinks.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({
      paymentLink: paymentLink.url,
      agentId,
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
