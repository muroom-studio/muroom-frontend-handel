import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { BE_BASE_URL } from './config/constants';

const GUEST_ONLY_PATHS = ['/welcome', '/login', '/redirect/oauth'];
const PUBLIC_PATHS = ['/home'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api')) {
    const requestHeaders = new Headers(request.headers);

    const backendDomain = BE_BASE_URL;

    if (backendDomain) {
      requestHeaders.set('Origin', backendDomain);
      requestHeaders.set('Referer', backendDomain);
    }

    // -------------------------------------------------------------
    // [2] 페이지 라우팅 처리 (인증/리다이렉트 로직)
    // -------------------------------------------------------------

    // 루트 경로 리다이렉트
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/home', request.url));
    }

    const accessToken = request.cookies.get('accessToken')?.value;

    const isGuestOnlyPath = GUEST_ONLY_PATHS.some((path) =>
      pathname.startsWith(path),
    );
    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

    // 로그인 상태인데 게스트 전용 페이지 접근 시 -> 홈으로
    if (accessToken && isGuestOnlyPath) {
      return NextResponse.redirect(new URL('/home', request.url));
    }

    // 비로그인 상태이고 보호된 페이지 접근 시 -> 웰컴으로
    if (!accessToken && !isGuestOnlyPath && !isPublicPath) {
      return NextResponse.redirect(new URL('/welcome', request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)',
  ],
};
