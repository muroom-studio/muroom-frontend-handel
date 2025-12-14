'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@muroom/lib';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import WelcomeLayout from '@/layouts/welcome';
import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useResponsiveLayout();
  const { performRedirect } = useAuthRedirectStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        'z-99999 fixed inset-0',
        !isMobile && 'flex-center bg-black/20',
        isMobile && 'bg-white',
      )}
      onClick={() => {
        performRedirect();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'size-full',
          isMobile && 'pb-[env(safe-area-inset-bottom)]',
          !isMobile && 'size-auto',
        )}
      >
        <WelcomeLayout>{children}</WelcomeLayout>
      </div>
    </div>,
    document.body,
  );
}
