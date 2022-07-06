import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuth, supabaseClient as supabase } from '@supabase/auth-helpers-nextjs';
import { withSentry } from '@sentry/nextjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

interface ReturnBody {
  secret: string;
}

export default withApiAuth(withSentry(async (req: NextApiRequest, res: NextApiResponse<ReturnBody | string>): Promise<void> => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user?.user_metadata.admin) return res.status(403).send('Unauthorised');

  const connectionToken = await stripe.terminal.connectionTokens.create();

  return res.status(200).send({ secret: connectionToken.secret });
}));

export const config = {
  api: {
    externalResolver: true,
  },
};
