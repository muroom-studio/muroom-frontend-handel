'use server';

import { getToken, removeToken } from '@/utils/cookie';
import { customFetch } from '@/utils/customFetch';

export const postMusicianLogout = async () => {
  const { refreshToken } = await getToken();

  if (refreshToken) {
    try {
      await customFetch('/musician/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      console.error('Logout API failed:', error);
    }
  }

  await removeToken();

  return { success: true };
};
