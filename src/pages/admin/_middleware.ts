import { type NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export const middleware = async (req: NextRequest): Promise<NextResponse | Response> => {
  const token = req.cookies['sb-access-token'];

  const user = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  }).then((res) => res.json());

  if (user?.user_metadata?.admin) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
};
