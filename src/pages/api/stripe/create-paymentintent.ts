import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRequired, supabaseClient as userSupabase } from '@supabase/supabase-auth-helpers/nextjs';
import { createClient } from '@supabase/supabase-js';
import { withSentry } from '@sentry/nextjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

interface ReturnBody {
  clientSecret: string;
}

export default withAuthRequired(withSentry(async (req: NextApiRequest, res: NextApiResponse<ReturnBody | string>): Promise<void> => {
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
    amount: parseInt(process.env.NEXT_PUBLIC_TICKET_PRICE, 10),
    currency: 'gbp',
    payment_method_types: ['card', ...(terminal ? ['card_present'] : [])],
    receipt_email: user.email,
    metadata: {
      email: user.email,
      name: user.user_metadata.proper_name,
      user_id: user.id,
      payment_type: terminal ? 'card_present' : 'online',
      cashier: terminal ? userCalling.id : undefined,
    },
    capture_method: terminal ? 'manual' : 'automatic',
  });

  return res.status(200).send({ clientSecret: paymentIntent.client_secret });
}));
