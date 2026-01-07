'use client';

import { useEffect, useRef } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function JoinTriggerProvider() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // 중복 실행 방지를 위한 Ref
  const isTriggered = useRef(false);

  useEffect(() => {
    const trigger = searchParams.get('trigger_join');

    // trigger가 있고, 아직 처리 안 했을 때만 실행
    if (trigger === 'true' && !isTriggered.current) {
      isTriggered.current = true;

      // 1. 파라미터 제거
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.delete('trigger_join');

      const paramString = currentParams.toString();
      const cleanUrl = paramString ? `${pathname}?${paramString}` : pathname;

      console.log('✅ Trigger 감지! URL 정리 및 모달 오픈 시도');

      // ⚠️ 중요: window.history 대신 router.replace 사용
      // 이렇게 해야 Next.js가 "아, 주소가 바뀌었구나"라고 인지하고 _rsc 요청을 올바르게 보냅니다.
      router.replace(cleanUrl, { scroll: false });

      // 2. 라우터 상태가 업데이트될 시간을 아주 살짝 준 뒤 모달 오픈
      setTimeout(() => {
        // 쿼리 파라미터로 모달 제어
        router.push('/welcome?join=true', { scroll: false });
      }, 100);
    }
  }, [searchParams, router, pathname]);

  return null;
}
