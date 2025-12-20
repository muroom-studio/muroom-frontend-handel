import { BE_BASE_URL } from '@/config/constants';
import { ApiRequestError, type ApiResponse } from '@/types/api';
import { HttpSuccessStatusCode } from '@/types/http';

import { getToken } from './cookie';

function isSuccessResponse<T>(
  response: ApiResponse<T>,
): response is { status: HttpSuccessStatusCode; data: T; message: string } {
  return response.status >= 200 && response.status < 300;
}

export const customFetch = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const { accessToken } = await getToken();

  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    baseHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  const mergedOptions: RequestInit = {
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
