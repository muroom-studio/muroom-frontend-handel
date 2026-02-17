'use server';

import { cookies } from 'next/headers';

const SESSION_KEY = 'JSESSIONID';

/**
 * 서버 컴포넌트나 API 라우트에서 현재 세션 ID가 있는지 확인하기 위해 사용합니다.
 * @returns - JSESSIONID 값 또는 undefined
 */
export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_KEY)?.value;
}

/**
 * 로그아웃 시 클라이언트 측에 남은 세션 쿠키를 삭제합니다.
 * 실제 서버 세션 무효화는 별도의 로그아웃 API 호출이 필요합니다.
 */
export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
}
