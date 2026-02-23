'use server';

import { removeSession } from '@/utils/cookie';
import { customFetch } from '@/utils/customFetch';

export const postAuthMusicianLogout = async () => {
  try {
    await customFetch('/auth/musician/logout', {
      method: 'POST',
    });
  } catch (error) {
    console.error('Logout API failed:', error);
  }

  await removeSession();

  return { success: true };
};
