'use client';

import StudioBoastsNewPage from '@/components/studio-boasts/new';
import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

export default function Page() {
  const { isMobile } = useResponsiveLayout();

  return <StudioBoastsNewPage isMobile={isMobile} />;
}
