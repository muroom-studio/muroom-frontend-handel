import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const GUEST_ONLY_PATHS = ['/welcome', '/login', '/join'];

const PUBLIC_PATHS = ['/home', '/search', '/terms', '/', '/studio-boasts'];

const AUTH_REQUIRED_PATHS = [
  '/logout',
  '/mypage',
  '/extra',
  '/studio-boasts/new',
];

export function middleware(request: NextRequest) {
  // [수정] pathname과 함께 searchParams(쿼리 파라미터)를 가져옵니다.
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  const accessToken = request.cookies.get('accessToken')?.value;

  // 1. 게스트 전용 페이지인지 확인
  const isGuestOnlyPath = GUEST_ONLY_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  // 2. [추가] '/studio-boasts?my=true' 조건인지 별도로 확인
  const isMyStudioBoasts =
    pathname === '/studio-boasts' && searchParams.get('my') === 'true';

  // 3. [수정] 공개 페이지인지 확인 (내 자랑 보기일 때는 공개 페이지 아님)
  const isPublicPath =
    !isMyStudioBoasts && PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  // 4. 인증 필수 페이지인지 확인
  const isAuthRequiredPath = AUTH_REQUIRED_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  // [로직 1] 로그인 상태인데 게스트 페이지 접근 시 -> 홈으로
  if (accessToken && isGuestOnlyPath) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // [로직 2] 비로그인 상태인데 권한 필요한 페이지 접근 시 -> 웰컴으로
  if (!accessToken) {
    if (
      isAuthRequiredPath || // 명시적 인증 필요 경로이거나
      isMyStudioBoasts || // [추가] '내 자랑 모아보기' 이거나
      (!isGuestOnlyPath && !isPublicPath) // 게스트도 아니고 퍼블릭도 아닌 경우
    ) {
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
