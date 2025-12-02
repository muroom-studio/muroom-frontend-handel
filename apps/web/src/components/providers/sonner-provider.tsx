'use client';

import { Toaster } from 'sonner';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

function SonnerProvider() {
  const { isMobile } = useResponsiveLayout();

  return (
    <Toaster
      richColors
      // 위치 설정
      position={isMobile ? 'bottom-center' : 'bottom-right'}
      className='z-99999!'
      toastOptions={{
        style: { zIndex: 99999 },
        className: '!z-[99999]',
      }}
    />
  );
}

export default SonnerProvider;
