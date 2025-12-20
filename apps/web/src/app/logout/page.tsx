'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { postMusicianLogout } from '@/lib/musician/(server)';

import Loading from '../loading';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await postMusicianLogout();

      window.location.href = '/home';
    };

    handleLogout();
  }, [router]);

  return <Loading />;
}
