'use client';

import { Toaster } from 'sonner';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

function SonnerProvider() {
  const { isMobile } = useResponsiveLayout();

  return (
    <Toaster
      position={isMobile ? 'bottom-center' : 'bottom-right'}
      offset={isMobile ? 24 : 16}
      style={{ zIndex: 99999 }}
      toastOptions={{
        className: `
          !bg-gray-700 
          !text-white 
          !rounded-4 
          !p-3 
          !flex 
          !items-center 
          !justify-start
          !gap-3
          !text-base-m-14-1
          le ? '!w-[calc(100vw-32px)]' : '!w-[360px]'}
          !mx-auto
        `,

        classNames: {
          icon: '!hidden',
          actionButton:
            '!ml-auto !bg-transparent !text-white !text-base-m-14-2 !shrink-0 !cursor-pointer hover:!bg-gray-600',
        },

        style: {
          border: 'none',
        },
      }}
    />
  );
}

export default SonnerProvider;
