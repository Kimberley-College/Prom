import { handleAuth } from '@supabase/auth-helpers-nextjs';
import { withSentry } from '@sentry/nextjs';
import cookieOptions from 'util/cookieOptions';

export default withSentry(handleAuth({
  cookieOptions,
  logout: {
    returnTo: '/',
  },
}));

export const config = {
  api: {
    externalResolver: true,
  },
};
