import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRequired, supabaseClient as userSupabase } from '@supabase/supabase-auth-helpers/nextjs';
import { createClient } from '@supabase/supabase-js';

interface ShortUser {
  id: string;
  name: string;
}

export default withAuthRequired(async (req: NextApiRequest, res: NextApiResponse<ShortUser[] | string>): Promise<void> => {
  const { data: calledUser, error: calledUserError } = await userSupabase.auth.api.getUserByCookie(req, res);

  if (calledUserError) return res.status(calledUserError.status).send(calledUserError.message);
  if (!calledUser.user_metadata.admin) return res.status(403).send('Unauthorised');

  const serverSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

  const { data, error: rpcError } = await serverSupabase.rpc<ShortUser>('ticketless');

  if (rpcError) return res.status(500).send(rpcError.message);

  return res.status(200).json(data);
});
