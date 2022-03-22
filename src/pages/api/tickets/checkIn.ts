import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRequired, supabaseClient as supabase } from '@supabase/supabase-auth-helpers/nextjs';
import { verify } from 'async-jsonwebtoken';
import { withSentry } from '@sentry/nextjs';

interface ReturnBody {
  name: string;
}

interface JWT {
  name: string;
  email: string;
  user_id: string;
  id: string;
  created_at: string;
}

export default withAuthRequired(withSentry(async (req: NextApiRequest, res: NextApiResponse<ReturnBody | string>): Promise<void> => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user?.user_metadata.admin) return res.status(403).send('Unauthorised');

  const serverSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

  const { ticket } = req.body;

  const verifyRes = await verify(ticket, process.env.JWT_SECRET).catch(() => res.status(403).send('Unauthorised'));

  if (!verifyRes?.[0]) return res.status(400).send('Invalid ticket');

  const decoded: JWT = verifyRes[0] as JWT;

  const { error } = await serverSupabase.from('tickets').update({ checked_in: true }).match({ id: decoded.id }).single();

  if (error) return res.status(500).send(error.message);

  return res.status(200).send({ name: decoded.name });
}));

export const config = {
  api: {
    externalResolver: true,
  },
};
