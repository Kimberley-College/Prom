import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRequired, supabaseClient as userSupabase } from '@supabase/supabase-auth-helpers/nextjs';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

interface ReturnBody {
  clientSecret: string;
}

export default withAuthRequired(async (req: NextApiRequest, res: NextApiResponse<ReturnBody | string>): Promise<void> => {
  const { user: userCalling, error } = await userSupabase.auth.api.getUserByCookie(req);
  if (error) return res.status(error.status).send(error.message);

  let user = userCalling;

  const { userId, terminal }: { userId?: string, terminal: boolean } = req.body;
  if (userId) {
    if (!userCalling.user_metadata.admin) return res.status(403).send('Unauthorised');
    const serverSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
    const calledUser = await serverSupabase.auth.api.getUserById(userId);
    if (calledUser.error) return res.status(500).send('User not found');
    user = calledUser.data;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 3000,
    currency: 'gbp',
    payment_method_types: ['card', 'card_present'],
    receipt_email: user.email,
    metadata: {
      email: user.email,
      name: user.user_metadata.proper_name,
      user_id: user.id,
    },
    capture_method: terminal ? 'manual' : 'automatic',
  });

  return res.status(200).send({ clientSecret: paymentIntent.client_secret });
});
