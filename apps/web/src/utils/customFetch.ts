import { BE_BASE_URL } from '@/config/constants';
import { ApiRequestError, type ApiResponse } from '@/types/api';
import { HttpSuccessStatusCode } from '@/types/http';

interface CustomRequestInit extends RequestInit {
  timeout?: number;
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
  const { timeout = 2000, ...restOptions } = options;

  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const mergedOptions: CustomRequestInit = {
    ...restOptions,
    credentials: restOptions.credentials || 'include',
    headers: {
      ...baseHeaders,
      ...restOptions.headers,
    },
    signal: restOptions.signal || AbortSignal.timeout(timeout),
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
  } catch (error: any) {
    if (error.name === 'TimeoutError') {
      console.error(`⏱️ [Timeout] ${timeout}ms 경과로 요청 중단: ${fullUrl}`);
      throw new Error('요청 시간이 초과되었습니다. 잠시 후 다시 시도됩니다.');
    }

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
