import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRequired, supabaseClient as userSupabase } from '@supabase/supabase-auth-helpers/nextjs';
import { createClient } from '@supabase/supabase-js';

interface ManagedUser {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  hasTicket: boolean;
  checkedIn: boolean;
}

interface Ticket {
  id: string;
  created_at: string;
  email: string;
  checked_in: boolean;
  customer_id: string;
  user_id: string;
}

export default withAuthRequired(async (req: NextApiRequest, res: NextApiResponse<ManagedUser | string>): Promise<void> => {
  const { data: calledUser, error: calledUserError } = await userSupabase.auth.api.getUserByCookie(req, res);

  if (calledUserError) return res.status(calledUserError.status).send(calledUserError.message);
  if (!calledUser.user_metadata.admin) return res.status(403).send('Unauthorised');

  const serverSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

  const { data: user, error: getUserError } = await serverSupabase.auth.api.getUserById(req.query.id as string);
  if (getUserError) return res.status(getUserError.status).send(getUserError.message);

  const { data: ticket, error: ticketError } = await serverSupabase.from<Ticket>('tickets').select('*').eq('user_id', user.id).maybeSingle();
  if (ticketError) return res.status(500).send(ticketError.message);

  return res.status(200).json({
    id: user.id,
    email: user.email,
    name: user.user_metadata.proper_name as string,
    is_admin: user.user_metadata.admin as boolean,
    hasTicket: !!ticket,
    checkedIn: ticket?.checked_in,
  });
});
