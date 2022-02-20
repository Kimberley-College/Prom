import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from 'util/supabaseClient';
import type { User } from '@supabase/supabase-js';

interface ResponseBody {
  error?: string;
  user?: User;
}

export default async (req: NextApiRequest, res: NextApiResponse<ResponseBody>): Promise<void> => {
  const { token } = req.headers;

  const { data: user, error } = await supabase.auth.api.getUser(token as string);

  if (error) return res.status(401).send({ error: error.message });
  return res.status(200).send({ user });
};
