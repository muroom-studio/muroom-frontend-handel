'use client';

import { useEffect } from 'react';

import { useThrowError } from '@/hooks/common/useThrowError';
import { postMusicianLogout } from '@/lib/musician/(server)';

import Loading from '../loading';

export default function LogoutPage() {
  const throwError = useThrowError();

  useEffect(() => {
    postMusicianLogout()
      .then(() => {
        window.location.href = '/home';
      })
      .catch((e) => {
        throwError(e);
      });
  }, [throwError]);

  return <Loading />;
}
