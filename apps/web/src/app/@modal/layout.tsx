'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useRouter } from 'next/navigation';

import { cn } from '@muroom/lib';

import { useWelcomeMode } from '@/hooks/nuqs/welcome/useWelcomeMode';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import WelcomeLayout from '@/layouts/welcome';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isMobile } = useResponsiveLayout();
  const { setJoin } = useWelcomeMode();
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
        if (!isMobile) {
          router.back();
          setJoin(false);
        }
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
