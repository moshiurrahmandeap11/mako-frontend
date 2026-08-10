import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Better Auth stores its session token in a cookie.
  // The name can be better-auth.session_token or similar depending on the environment.
  // We can do a simple check: if any auth cookie exists, or check a specific one.
  const hasSessionCookie = 
    request.cookies.has('better-auth.session_token') || 
    request.cookies.has('__Secure-better-auth.session_token') ||
    request.cookies.has('mako_auth_session'); // add any other known session cookies if needed

  // If the user does not have a session cookie, redirect them to the login page.
  if (!hasSessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths under /dashboard, /products, /widget-settings, /api-keys, /conversations
     */
    '/dashboard/:path*',
    '/products/:path*',
    '/widget-settings/:path*',
    '/api-keys/:path*',
    '/conversations/:path*',
  ],
};
