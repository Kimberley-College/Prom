import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
  if (!req.nextUrl.pathname.startsWith('/security') && !req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/panel')) return NextResponse.next();

  const token = req.cookies['sb-access-token'];

  const user = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  }).then((res) => res.json());

  if (req.nextUrl.pathname.startsWith('/security')) {
    if (user?.user_metadata?.admin || user?.user_metadata?.roles.includes('admin') || user?.user_metadata?.roles.includes('security')) {
      return NextResponse.next();
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (user?.user_metadata?.admin || user?.user_metadata?.roles.includes('admin')) {
      return NextResponse.next();
    }
  }

  if (req.nextUrl.pathname.startsWith('/panel')) {
    if (user) {
      return NextResponse.next();
    }
  }
  const url = req.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
};

export const config = { // This doesn't do anything before Next.js 12.2.0
  matcher: ['/admin/:path*', '/panel', '/security/:path*'],
};
