'use client';

import { Toaster } from 'sonner';

import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

function SonnerProvider() {
  const { isMobile } = useResponsiveLayout();

  return (
    <Toaster
      position={isMobile ? 'bottom-center' : 'bottom-right'}
      expand={true}
      gap={8}
      offset={isMobile ? 0 : 16}
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
          !mx-auto
          
          ${
            isMobile
              ? '!fixed !bottom-6 !left-1/2 !-translate-x-1/2 !w-[calc(100vw-32px)]'
              : '!w-[360px]'
          }
        `,
        classNames: {
          error: '!bg-[#FB2C36]',
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
