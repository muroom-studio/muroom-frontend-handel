'use client';

import WelcomePage from '@/components/welcome';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export default function Page() {
  const { isMobile } = useResponsiveLayout();

  return <WelcomePage isMobile={isMobile} />;
}
