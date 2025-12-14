'use client';

import { Suspense, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@muroom/lib';

import HomePage from '@/components/home';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import WelcomeLayout from '@/layouts/welcome';
import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';

import Loading from '../loading';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useResponsiveLayout();
  const { performRedirect } = useAuthRedirectStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className='relative size-full'>
      {!isMobile && (
        <div className='absolute inset-0 z-0'>
          <Suspense fallback={<Loading />}>
            <HomePage isMobile={false} />
          </Suspense>
        </div>
      )}

      {mounted &&
        createPortal(
          <div
            className={cn(
              'z-99999 fixed inset-0',
              !isMobile && 'flex-center bg-black/20',
              isMobile && 'h-dvh bg-white pb-[env(safe-area-inset-bottom)]',
            )}
            onClick={() => {
              performRedirect();
            }}
          >
            <div
              className={cn(!isMobile && 'size-auto')}
              onClick={(e) => e.stopPropagation()}
            >
              <Suspense>
                <WelcomeLayout>{children}</WelcomeLayout>
              </Suspense>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
