import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';

interface ManagedUser {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  hasTicket: boolean;
  checkedIn: boolean;
}

export default withAuthRequired(async (req: NextApiRequest, res: NextApiResponse<ManagedUser | string>): Promise<void> => res.status(200).send('Hi'));
