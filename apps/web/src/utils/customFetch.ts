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

  try {
    const response = await fetch('/api/v1' + url, mergedOptions);
    const responseData: ApiResponse<T> = await response.json();

    if (isSuccessResponse(responseData)) {
      return responseData.data;
    } else {
      throw new ApiRequestError(responseData);
    }
  } catch (error) {
    if (error instanceof ApiRequestError) {
      throw error;
    }
    throw new Error(
      error instanceof Error ? error.message : '네트워크 요청 실패',
    );
  }
};
