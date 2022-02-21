import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseClient as supabase } from '@supabase/supabase-auth-helpers/nextjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

interface ReturnBody {
  clientSecret: string;
}

export default async (req: NextApiRequest, res: NextApiResponse<ReturnBody | string>): Promise<void> => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user?.email) return res.status(401).send('Unauthorized');

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 3000,
    currency: 'gbp',
    payment_method_types: ['card'],
    receipt_email: user.email,
    metadata: {
      email: user.email,
      name: user.user_metadata.proper_name,
    },
  });

  return res.status(200).send({ clientSecret: paymentIntent.client_secret });
};
