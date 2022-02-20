import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from 'util/supabaseClient';

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
