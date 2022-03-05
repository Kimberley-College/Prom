import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRequired, supabaseClient as supabase } from '@supabase/supabase-auth-helpers/nextjs';
import jwt from 'async-jsonwebtoken';
import { withSentry } from '@sentry/nextjs';

interface ReturnBody {
  name: string;
}

export default withAuthRequired(withSentry(async (req: NextApiRequest, res: NextApiResponse<ReturnBody | string>): Promise<void> => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user?.user_metadata.admin) return res.status(403).send('Unauthorised');

  const serverSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

  const { ticket } = req.body;

  const decoded = await jwt.verify(ticket, process.env.JWT_SECRET).catch(() => res.status(403).send('Unauthorised'));
  // eslint-disable-next-line consistent-return
  if (!decoded) return;

  const { data: updatedTicket, error } = await serverSupabase.from('tickets').update({ checked_in: true }).match({ id: ticket.id }).single();

  if (error) return res.status(500).send(error.message);

  return res.status(200).send({ name: updatedTicket.name });
}));
