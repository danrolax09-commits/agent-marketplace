import Stripe from 'stripe';

let stripe: Stripe | null = null;

function getStripe() {
  if (stripe) return stripe;
  
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }

  stripe = new Stripe(apiKey, {
    apiVersion: '2025-02-24.acacia' as any,
    httpClient: Stripe.createFetchHttpClient(),
    maxNetworkRetries: 2,
    timeout: 30000,
  });
  
  return stripe;
}

export { getStripe as stripe };

export async function createCheckoutSession(priceId: string, customerId?: string) {
  try {
    const stripeClient = getStripe();
    const session = await stripeClient.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      customer_email: customerId,
    });

    return session;
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
}

export async function verifyWebhook(body: string, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
  }

  try {
    const stripeClient = getStripe();
    return stripeClient.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook verification error:', error);
    throw error;
  }
}
