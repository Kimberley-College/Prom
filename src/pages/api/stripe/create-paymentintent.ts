import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

interface ReturnBody {
  clientSecret: string;
}

export default async (req: NextApiRequest, res: NextApiResponse<ReturnBody | string>): Promise<void> => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 3000,
    currency: 'gbp',
    payment_method_types: ['card'],
  });

  return res.status(200).send({ clientSecret: paymentIntent.client_secret });
};
