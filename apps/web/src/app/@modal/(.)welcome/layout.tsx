'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useSearchParams } from 'next/navigation';

import { cn } from '@muroom/lib';

import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';
import WelcomeLayout from '@/layouts/welcome';
import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useResponsiveLayout();
  const { performRedirect } = useAuthRedirectStore();
  const [mounted, setMounted] = useState(false);

  const isJoin = useSearchParams().get('join');

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        'z-999 fixed inset-0',
        !isMobile && 'flex-center bg-black/20',
        isMobile && 'h-dvh bg-white pb-[env(safe-area-inset-bottom)]',
      )}
      onClick={() => {
        if (isJoin) return;
        performRedirect();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn('size-full', !isMobile && 'size-auto')}
      >
        <WelcomeLayout>{children}</WelcomeLayout>
      </div>
    </div>,
    document.body,
  );
}
