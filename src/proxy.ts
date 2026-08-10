import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Better Auth stores its session token in cookies.
  // In production/HTTPS, browsers use __Secure- or __Host- prefixes.
  const authCookieNames = [
    'better-auth.session_token',
    '__Secure-better-auth.session_token',
    '__Host-better-auth.session_token',
    'better_auth_session',
    'mako_auth_session',
  ];

  const hasSessionCookie = authCookieNames.some((cookieName) =>
    request.cookies.has(cookieName)
  );

  // If the user does not have an active session cookie, redirect to login
  if (!hasSessionCookie) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/products/:path*',
    '/widget-settings/:path*',
    '/api-keys/:path*',
    '/conversations/:path*',
    '/billing/:path*',
  ],
};
