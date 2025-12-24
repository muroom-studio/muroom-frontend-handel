import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const GUEST_ONLY_PATHS = ['/welcome', '/login', '/redirect/oauth'];
const PUBLIC_PATHS = ['/home', '/search', '/terms', '/', '/studio-boasts'];
const AUTH_REQUIRED_PATHS = ['/logout', '/mypage', '/extra'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  const accessToken = request.cookies.get('accessToken')?.value;

  const isGuestOnlyPath = GUEST_ONLY_PATHS.some((path) =>
    pathname.startsWith(path),
  );
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  const isAuthRequiredPath = AUTH_REQUIRED_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  if (accessToken && isGuestOnlyPath) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!accessToken) {
    if (isAuthRequiredPath || (!isGuestOnlyPath && !isPublicPath)) {
      return NextResponse.redirect(new URL('/welcome', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)',
  ],
};
