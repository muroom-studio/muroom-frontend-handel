'use server';

import { cookies } from 'next/headers';

const ACCESS_TOKEN_KEY = 'accessToken';

// 10분(초 단위): 60초 * 10분
const MAX_AGE_TEN_MINUTES = 60 * 10;

/**
 * 서버에서 안전하게 액세스 토큰을 쿠키에 저장합니다. (로그인 시 사용)
 * @param accessToken - 저장할 토큰 값
 */
export async function setToken(accessToken: string) {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE_TEN_MINUTES,
    path: '/',
  });
}

/**
 * 서버에서 쿠키에 저장된 액세스 토큰을 가져옵니다. (API 호출 시 사용)
 * @returns - accessToken 값 또는 undefined
 */
export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(ACCESS_TOKEN_KEY)?.value;
}
