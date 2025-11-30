'use client';

import WelcomePage from '@/components/welcome';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export const dynamic = 'force-dynamic';

export default function InterceptedPage() {
  const { isMobile } = useResponsiveLayout();

  return <WelcomePage isMobile={isMobile} />;
}
