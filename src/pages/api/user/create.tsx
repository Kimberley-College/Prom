import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseClient as userSupabase, withApiAuth } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { withSentry } from '@sentry/nextjs';

interface FormData {
  name: string;
  email: string;
  roles: ('admin' | 'security')[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isFormData = (obj: any): obj is FormData => obj.name && obj.email && obj.roles;

export default withApiAuth(withSentry(async (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse | void> => {
  if (!isFormData(req.body)) return res.status(400).send('No form data provided');
  const formData = req.body;
  const { data: calledUser, error: calledUserError } = await userSupabase.auth.api.getUserByCookie(req, res);

  if (calledUserError) return res.status(calledUserError.status).send(calledUserError.message);
  if (!calledUser.user_metadata.admin && !calledUser.user_metadata.roles?.includes('admin')) return res.status(403).send('Unauthorised');

  const serverSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
  const { error: userError } = await serverSupabase.auth.api.createUser({
    email: formData.email,
    user_metadata: {
      proper_name: formData.name,
      roles: formData.roles,
      admin: formData.roles.includes('admin'),
    },
    email_confirm: true,
  });

  if (userError) return res.status(userError.status).send(userError.message);

  return res.status(204).end();
}));

export const config = {
  api: {
    externalResolver: true,
  },
};
