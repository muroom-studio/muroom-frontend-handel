'use client';

import { Toaster } from 'sonner';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

function SonnerProvider() {
  const { isMobile } = useResponsiveLayout();
  return (
    <Toaster
      richColors
      position={isMobile ? 'bottom-center' : 'bottom-right'}
    />
  );
}

export default SonnerProvider;
