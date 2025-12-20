'use server';

import { BE_BASE_URL } from '@/config/constants';
import { getToken, removeToken, setToken } from '@/utils/cookie';

export const postUserRefresh = async () => {
  const { refreshToken } = await getToken();
  const baseUrl = typeof window === 'undefined' ? BE_BASE_URL : '';

  if (!refreshToken) return null;

  try {
    // 1. 순수 fetch 사용 (무한 루프 방지)
    const response = await fetch(`${baseUrl}/api/v1/user/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 요청하신 대로 커스텀 헤더 사용
        refreshToken: refreshToken,
      },
    });

    if (!response.ok) {
      throw new Error('Refresh failed');
    }

    const responseData = await response.json();
    // 백엔드 응답 구조에 맞춰 data 추출 (예: responseData.data가 토큰 객체라고 가정)
    const newTokens = responseData.data;

    // 2. [중요] 서버 사이드 쿠키 갱신
    if (newTokens?.accessToken && newTokens?.refreshToken) {
      await setToken(newTokens.accessToken, newTokens.refreshToken);
      return newTokens; // customFetch에서 즉시 사용하기 위해 반환
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    // 갱신 실패 시 로그아웃 처리
    await removeToken();
  }

  return null;
};
