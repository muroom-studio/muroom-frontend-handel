'use client';

import StudioBoastsPage from '@/components/studio-boasts';
import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

export default function Page() {
  const { isMobile } = useResponsiveLayout();

  return <StudioBoastsPage isMobile={isMobile} />;
}
