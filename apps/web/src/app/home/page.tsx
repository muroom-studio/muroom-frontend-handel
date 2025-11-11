'use client';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

import HomePage from '@/components/home';

export default function Page() {
  const { isMobile } = useResponsiveLayout();

  return <HomePage isMobile={isMobile} />;
}
