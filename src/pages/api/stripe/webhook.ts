import { buffer } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { withSentry } from '@sentry/nextjs';
import Stripe from 'stripe';
import { sign } from 'async-jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

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

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

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
    default:
      console.warn(`Unhandled event type: ${event.type}`);
      res.status(200).end();
      return;
  }

  const customer = await stripe.customers.create({
    name: paymentIntent.metadata.name,
    email: paymentIntent.metadata.email,
    metadata: {
      user_id: paymentIntent.metadata.user_id,
    },
  });

  await stripe.paymentIntents.update(paymentIntent.id, {
    customer: customer.id,
  });

  const time = new Date().toISOString();
  const uuid = uuidv4();
  const jwtPayload = {
    name: paymentIntent.metadata.name,
    email: paymentIntent.metadata.email,
    user_id: paymentIntent.metadata.user_id,
    id: uuid,
    created_at: time,
  } as const;

  const [signedJwt] = await sign(jwtPayload, process.env.JWT_SECRET);

  const { error: createError } = await supabase.from('tickets').insert({
    user_id: paymentIntent.metadata.user_id,
    email: paymentIntent.metadata.email,
    checked_in: false,
    customer_id: customer.id,
    created_at: time,
    id: uuid,
    jwt: signedJwt,
    payment_type: paymentIntent.metadata.payment_type,
    cashier: paymentIntent.metadata.cashier,
  }).single();

  if (createError) {
    res.status(500).send(createError);
    return;
  }

  // Acknowledge code
  res.status(200).json({ received: true });
};

export default withSentry(cors(webhookHandler));
