import { BE_BASE_URL } from '@/config/constants';
import { ApiRequestError, type ApiResponse } from '@/types/api';
import { HttpSuccessStatusCode } from '@/types/http';

interface CustomRequestInit extends RequestInit {
  // 세션 방식에서는 브라우저가 만료를 처리하므로 _retry가 불필요할 수 있으나,
  // 필요에 따라 남겨둘 수 있습니다.
}

function isSuccessResponse<T>(
  response: ApiResponse<T>,
): response is { status: HttpSuccessStatusCode; data?: T; message: string } {
  return response.status >= 200 && response.status < 300;
}

export const customFetch = async <T>(
  url: string,
  options: CustomRequestInit = {},
): Promise<T> => {
  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const mergedOptions: CustomRequestInit = {
    ...options,
    credentials: options.credentials || 'include',
    headers: {
      ...baseHeaders,
      ...options.headers,
    },
  };

  const baseUrl = typeof window === 'undefined' ? BE_BASE_URL : '';
  const fullUrl = `${baseUrl}/api/v1${url}`;

  try {
    const response = await fetch(fullUrl, mergedOptions);

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new ApiRequestError(errorData);
      } catch (e) {
        if (e instanceof ApiRequestError) throw e;
        throw new Error('서버 응답 파싱 실패');
      }
    }

    const responseData: ApiResponse<T> = await response.json();

    if (isSuccessResponse(responseData)) {
      return (responseData.data ?? true) as T;
    } else {
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
