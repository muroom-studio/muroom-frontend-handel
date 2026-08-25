import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 서비스 종료: 모든 페이지 요청을 종료 안내 페이지(/closed)로 고정하고,
// API 요청은 410 Gone 으로 차단합니다.
const CLOSED_PATH = '/closed';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api')) {
    return NextResponse.json(
      { message: '서비스가 종료되었습니다.' },
      { status: 410 },
    );
  }

  if (pathname === CLOSED_PATH) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(CLOSED_PATH, request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
