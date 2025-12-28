'use server';

import { cookies } from 'next/headers';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// 10분 설정은 제거합니다. (브라우저 쿠키 삭제 방지)
// const MAX_AGE_TEN_MINUTES = 60 * 10;

// 7일(초 단위): 60초 * 60분 * 24시간 * 7일
const MAX_AGE_SEVEN_DAYS = 60 * 60 * 24 * 7;

/**
 * 서버에서 안전하게 액세스 토큰과 리프레시 토큰을 쿠키에 저장합니다.
 * @param accessToken - 저장할 액세스 토큰 값
 * @param refreshToken - 저장할 리프레시 토큰 값
 */
export async function setToken(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  // [수정] Access Token도 7일간 유지합니다.
  // 실제 유효성 검사는 서버가 토큰 내부의 exp 값을 보고 판단하므로,
  // 쿠키가 오래 남아있어도 보안상 문제는 없습니다.
  cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE_SEVEN_DAYS, // 10분 -> 7일로 변경
    path: '/',
  });

  // Refresh Token 저장 (긴 만료 기간)
  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE_SEVEN_DAYS,
    path: '/',
  });
}

/**
 * 서버에서 쿠키에 저장된 액세스 토큰과 리프레시 토큰을 가져옵니다.
 * @returns - { accessToken, refreshToken } 형태의 객체 반환
 */
export async function getToken() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  return {
    accessToken,
    refreshToken,
  };
}

/**
 * 로그아웃 등을 위해 토큰을 삭제할 때 사용합니다.
 */
export async function removeToken() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}
