import { handleAuth } from '@supabase/supabase-auth-helpers/nextjs';

export default handleAuth({
  lifetime: 60 * 60 * 24 * 30, // 30 Day Sessions
});
