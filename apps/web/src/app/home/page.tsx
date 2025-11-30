'use client';

import HomePage from '@/components/home';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export default function Page() {
  const { isMobile } = useResponsiveLayout();

  return <HomePage isMobile={isMobile} />;
}
