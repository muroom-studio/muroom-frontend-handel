'use client';

import { useEffect, useState } from 'react';

import { getToken } from '@/utils/cookie';

export function useAuthCheck() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await getToken();
        setIsLoggedIn(!!token);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  return { isLoggedIn, isLoading };
}
