// src/api/customFetch.ts
import { BE_BASE_URL } from '@/config/constants';
import { ApiRequestError, type ApiResponse } from '@/types/api';
import { HttpSuccessStatusCode } from '@/types/http';

import { getToken } from './cookie';

// 성공 응답인지 판별하는 Type Guard
function isSuccessResponse<T>(
  response: ApiResponse<T>,
): response is { status: HttpSuccessStatusCode; data: T; message: string } {
  return response.status >= 200 && response.status < 300;
}

export const customFetch = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const token = await getToken();

  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    baseHeaders['Authorization'] = `Bearer ${token}`;
  }

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...baseHeaders,
      ...options.headers,
    },
  };

  // ⭐️ [핵심 수정] 환경에 따른 Base URL 설정
  // 서버 환경(window === undefined): 백엔드 URL로 직접 요청 (Rewrite 무시)
  // 클라이언트 환경: 빈 문자열 -> 상대 경로 사용 -> Next.js Rewrite(Proxy) 작동
  const baseUrl = typeof window === 'undefined' ? BE_BASE_URL : '';

  // ⭐️ [핵심 수정] 전체 URL 조립
  // 예: 서버 -> https://api.muroom.kr/api/v1/terms
  // 예: 클라 -> /api/v1/terms
  const fullUrl = `${baseUrl}/api/v1${url}`;

  try {
    const response = await fetch(fullUrl, mergedOptions);

    // fetch 자체가 실패했을 경우 (네트워크 에러 등)
    if (!response) {
      throw new Error('No response from server');
    }

    const responseData: ApiResponse<T> = await response.json();

    if (isSuccessResponse(responseData)) {
      return responseData.data;
    } else {
      throw new ApiRequestError(responseData);
    }
  } catch (error) {
    // ⭐️ [추가] 서버 사이드 디버깅용 로그 (터미널에서 에러 원인 확인 가능)
    if (typeof window === 'undefined') {
      console.error(`❌ [Server Fetch Error] ${fullUrl}:`, error);
    }

    if (error instanceof ApiRequestError) {
      throw error;
    }
    throw new Error(
      error instanceof Error ? error.message : '네트워크 요청 실패',
    );
  }
};
