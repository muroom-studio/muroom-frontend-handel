'use client';

import { useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function JoinTriggerProvider() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get('trigger_join') === 'true') {
      const currentParams = new URLSearchParams(searchParams.toString());

      currentParams.delete('trigger_join');

      const cleanUrl = `${pathname}?${currentParams.toString()}`;
      window.history.replaceState(
        null,
        '',
        cleanUrl === `${pathname}?` ? pathname : cleanUrl,
      );

      router.push('/welcome?join=true');
    }
  }, [searchParams, router, pathname]);

  return null;
}
