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
      offset={isMobile ? 0 : 8}
      style={{ zIndex: 99999 }}
      toastOptions={{
        style: isMobile
          ? { bottom: 'var(--mobile-offset, 24px)', border: 'none' }
          : { border: 'none' },
        className: `
          !bg-gray-700
          data-[type=error]:!bg-[#FB2C36]
          !text-white 
          !rounded-4 
          !p-3 
          !flex 
          !items-center 
          !justify-start
          !gap-3
          !text-base-m-14-1
          !mx-auto
          transition-all duration-300 ease-in-out
          !pointer-events-none 
          
          ${
            isMobile
              ? '!fixed !left-1/2 !-translate-x-1/2 !w-[calc(100vw-32px)]'
              : '!w-[360px]'
          }
        `,
        classNames: {
          error: '',
          icon: '!hidden',
          actionButton:
            '!pointer-events-auto !ml-auto !bg-transparent !text-white !text-base-m-14-2 !shrink-0 !cursor-pointer hover:!bg-gray-600',
        },
      }}
    />
  );
}

export default SonnerProvider;
