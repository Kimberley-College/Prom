import { buffer } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    // On error, log and return the error message.
    if (err instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    res.status(400).send(`Webhook Error: ${errorMessage}`);
    return;
  }

  let paymentIntent: Stripe.PaymentIntent;
  switch (event.type) {
    case 'payment_intent.succeeded':
      paymentIntent = event.data.object as Stripe.PaymentIntent;
      break;
    case 'payment_intent.payment_failed':
      paymentIntent = event.data.object as Stripe.PaymentIntent;
      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
      return;
  }

  const customer = await stripe.customers.create({
    name: paymentIntent.metadata.name,
    email: paymentIntent.metadata.email,
  });

  await stripe.paymentIntents.update(paymentIntent.id, {
    customer: customer.id,
  });

  // Acknowledge code
  res.json({ received: true });
};

export default cors(webhookHandler);
