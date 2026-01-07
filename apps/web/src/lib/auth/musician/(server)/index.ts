'use server';

import { BE_BASE_URL } from '@/config/constants';
import { getToken, removeToken, setToken } from '@/utils/cookie';
import { customFetch } from '@/utils/customFetch';

export const postAuthMusicianLogout = async () => {
  const { refreshToken } = await getToken();

  if (!refreshToken) {
    throw new Error('로그아웃 도중 토큰이 만료되었습니다.');
  }

  try {
    await customFetch('/auth/musician/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  } catch (error) {
    console.error('Logout API failed:', error);
  }

  await removeToken();

  return { success: true };
};

export const postAuthMusicianRefresh = async () => {
  const { refreshToken } = await getToken();
  const baseUrl = typeof window === 'undefined' ? BE_BASE_URL : '';

  if (!refreshToken) return null;

  try {
    const response = await fetch(`${baseUrl}/api/v1/auth/musician/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        refreshToken: refreshToken,
      },
    });

    if (!response.ok) {
      throw new Error('Refresh failed');
    }

    const responseData = await response.json();
    const newTokens = responseData.data;

    if (newTokens?.accessToken && newTokens?.refreshToken) {
      await setToken(newTokens.accessToken, newTokens.refreshToken);
      return newTokens;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    await removeToken();
  }

  return null;
};
