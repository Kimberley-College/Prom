import { handleAuth } from '@supabase/supabase-auth-helpers/nextjs';
import { withSentry } from '@sentry/nextjs';

export default withSentry(handleAuth({
  name: 'sb',
  lifetime: 60 * 60 * 24 * 30, // 30 Day Sessions
  domain: '',
  path: '/',
  sameSite: 'Strict',
}));
