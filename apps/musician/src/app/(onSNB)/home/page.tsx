'use client';

import HomePage from '@/components/home';
import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

export default function Page() {
  const { isMobile } = useResponsiveLayout();

  if (typeof window !== 'undefined') {
    throw new Error('GA4 증적을 위한 의도적 렌더링 에러!');
  }

  return <HomePage isMobile={isMobile} />;
}
