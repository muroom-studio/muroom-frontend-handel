'use client';

import { useEffect } from 'react';

import HomePage from '@/components/home';
import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';
import { customFetch } from '@/utils/customFetch';

export default function Page() {
  const { isMobile } = useResponsiveLayout();

  useEffect(() => {
    // 존재하지 않는 경로로 요청을 보내 404를 유도합니다.
    customFetch('/trigger-error-for-ga');
  }, []);

  return <HomePage isMobile={isMobile} />;
}
