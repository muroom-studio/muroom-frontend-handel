'use client';

import { useEffect, useRef } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function JoinTriggerProvider() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isTriggered = useRef(false);

  useEffect(() => {
    const trigger = searchParams.get('trigger_join');

    if (trigger === 'true' && !isTriggered.current) {
      isTriggered.current = true;

      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.delete('trigger_join');

      const paramString = currentParams.toString();
      const cleanUrl = paramString ? `${pathname}?${paramString}` : pathname;

      console.log('✅ Trigger 감지! URL 정리 및 모달 오픈 시도');

      router.replace(cleanUrl, { scroll: false });

      setTimeout(() => {
        router.push('/welcome?join=true', { scroll: false });
      }, 100);
    }
  }, [searchParams, router, pathname]);

  return null;
}
