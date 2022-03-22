import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRequired, supabaseClient as userSupabase } from '@supabase/supabase-auth-helpers/nextjs';
import { createClient } from '@supabase/supabase-js';
import { withSentry } from '@sentry/nextjs';

interface Return {
  id: string;
  is_admin: boolean;
}

export default withAuthRequired(withSentry(async (req: NextApiRequest, res: NextApiResponse<Return | string>): Promise<void> => {
  if (!req.query.id) return res.status(400).send('No user id provided');
  const { data: calledUser, error: calledUserError } = await userSupabase.auth.api.getUserByCookie(req, res);

  if (calledUserError) return res.status(calledUserError.status).send(calledUserError.message);
  if (!calledUser.user_metadata.admin) return res.status(403).send('Unauthorised');

  const serverSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

  const { data } = await serverSupabase.rpc<Return>('toggle_admin', { user_id: req.query.id }).single();

  return res.status(200).json({
    id: data.id,
    is_admin: data.is_admin,
  });
}));

export const config = {
  api: {
    externalResolver: true,
  },
};
