import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRequired, supabaseClient as userSupabase } from '@supabase/supabase-auth-helpers/nextjs';
import { createClient } from '@supabase/supabase-js';
import { withSentry } from '@sentry/nextjs';
import { UserWithTicketInfo } from 'types/user';

export default withAuthRequired(withSentry(async (req: NextApiRequest, res: NextApiResponse<UserWithTicketInfo[] | string>): Promise<void> => {
  const { data: calledUser, error: calledUserError } = await userSupabase.auth.api.getUserByCookie(req, res);

  if (calledUserError) return res.status(calledUserError.status).send(calledUserError.message);
  if (!calledUser.user_metadata.admin) return res.status(403).send('Unauthorised');

  const serverSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

  const { data, error: rpcError } = await serverSupabase.rpc<UserWithTicketInfo>('userswithticketinfo');

  if (rpcError) return res.status(500).send(rpcError.message);

  return res.status(200).json(data);
}));

export const config = {
  api: {
    externalResolver: true,
  },
};
