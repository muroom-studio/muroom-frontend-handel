'use client';

import { useEffect } from 'react';

import { useThrowError } from '@/hooks/common/useThrowError';
import { postAuthMusicianLogout } from '@/lib/auth/musician/(server)';

import Loading from '../loading';

export default function LogoutPage() {
  const throwError = useThrowError();

  useEffect(() => {
    postAuthMusicianLogout()
      .then(() => {
        window.location.href = '/home';
      })
      .catch((e) => {
        throwError(e);
      });
  }, [throwError]);

  return <Loading />;
}
