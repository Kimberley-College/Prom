import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRequired, supabaseClient as userSupabase } from '@supabase/supabase-auth-helpers/nextjs';
import { withSentry } from '@sentry/nextjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default withAuthRequired(withSentry(async (req: NextApiRequest, res: NextApiResponse<string>): Promise<void> => {
  const { user, error } = await userSupabase.auth.api.getUserByCookie(req);
  if (error) return res.status(error.status).send(error.message);

  if (!user.user_metadata.admin) return res.status(403).send('Unauthorised');

  const paymentIntent = await stripe.paymentIntents.capture(req.body.paymentIntentId);

  if (paymentIntent.status === 'succeeded') return res.status(200).send('Success');
  return res.status(500).send(paymentIntent.status);
}));

export const config = {
  api: {
    externalResolver: true,
  },
};
