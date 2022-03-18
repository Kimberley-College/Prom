import { type NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export const middleware = async (req: NextRequest): Promise<NextResponse | Response> => {
  const url = req.nextUrl.clone();

  if (url.pathname !== '/panel') return NextResponse.next();
  const token = req.cookies['sb-access-token'] ?? req.nextUrl.hash.match(/access_token=.[^&]*/)?.[0].split('=')[1];

  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  });

  if (res.ok) {
    return NextResponse.next();
  }

  url.pathname = '/';
  return NextResponse.redirect(url);
};
