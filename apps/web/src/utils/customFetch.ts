import { BE_BASE_URL } from '@/config/constants';
import { type ApiResponse } from '@/types/api';
import { HttpSuccessStatusCode } from '@/types/http';

// async function getAccessToken() {
//   if (typeof window === 'undefined') {
//     const { cookies } = await import('next/headers');
//     const cookieStore = await cookies();
//     return cookieStore.get('accessToken')?.value;
//   }
//   return getCookie('accessToken');
// }

function isSuccessResponse<T>(
  response: ApiResponse<T>,
): response is { status: HttpSuccessStatusCode; data: T; message: string } {
  return response.status >= 200 && response.status < 300;
}

export const customFetch = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  //   const token = await getAccessToken();
  const token = '';

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

  const response = await fetch(BE_BASE_URL + url, mergedOptions);

  const responseData: ApiResponse<T> = await response.json();

  if (isSuccessResponse(responseData)) {
    return responseData.data;
  } else {
    throw new Error(responseData.error?.message || 'API 요청에 실패했습니다.');
  }
};
