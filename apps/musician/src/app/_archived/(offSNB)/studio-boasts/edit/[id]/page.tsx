'use client';

import { useParams } from 'next/navigation';

import StudioBoastsEditPage from '@/components/studio-boasts/edit';
import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

export default function Page() {
  const params = useParams();

  const studioBoastsId = params.id as string;

  const { isMobile } = useResponsiveLayout();

  return (
    <StudioBoastsEditPage isMobile={isMobile} studioBoastId={studioBoastsId} />
  );
}
