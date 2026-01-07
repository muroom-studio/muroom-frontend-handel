import { BE_BASE_URL } from '@/config/constants';
import { postAuthMusicianRefresh } from '@/lib/auth/musician/(server)';
import { ApiRequestError, type ApiResponse } from '@/types/api';
import { HttpSuccessStatusCode } from '@/types/http';

import { getToken } from './cookie';

// 재시도 여부 플래그 추가
interface CustomRequestInit extends RequestInit {
  _retry?: boolean;
}

function isSuccessResponse<T>(
  response: ApiResponse<T>,
): response is { status: HttpSuccessStatusCode; data: T; message: string } {
  return response.status >= 200 && response.status < 300;
}

export const customFetch = async <T>(
  url: string,
  options: CustomRequestInit = {},
): Promise<T> => {
  const { accessToken, refreshToken } = await getToken();

  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    baseHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  const mergedOptions: CustomRequestInit = {
    ...options,
    headers: {
      ...baseHeaders,
      ...options.headers,
    },
  };

  const baseUrl = typeof window === 'undefined' ? BE_BASE_URL : '';
  const fullUrl = `${baseUrl}/api/v1${url}`;

  try {
    const response = await fetch(fullUrl, mergedOptions);

    if (!response) {
      throw new Error('No response from server');
    }

    const responseData: ApiResponse<T> = await response.json();

    if (isSuccessResponse(responseData)) {
      return responseData.data;
    } else {
      if (responseData.status === 401 && !options._retry && refreshToken) {
        console.log('🔄 401 detected. Attempting to refresh token...');

        // 1. Server Action 호출 (토큰 갱신 + 쿠키 설정)
        const newTokens = await postAuthMusicianRefresh();

        if (newTokens?.accessToken) {
          console.log('✅ Token refreshed. Retrying original request...');

          // 2. 원래 요청 재시도
          return await customFetch<T>(url, {
            ...options,
            _retry: true, // 재시도 플래그 설정 (무한 루프 방지)
            headers: {
              ...options.headers,
              // 3. 방금 받은 새 토큰으로 헤더 교체 (쿠키 반영 시차 방지)
              Authorization: `Bearer ${newTokens.accessToken}`,
            },
          });
        }
      }

      throw new ApiRequestError(responseData);
    }
  } catch (error) {
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
