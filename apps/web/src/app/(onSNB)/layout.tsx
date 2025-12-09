'use client';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import DesktopSnb from '@/layouts/components/desktop-snb';
import MobileFooter from '@/layouts/components/mobile-footer';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { isMobile } = useResponsiveLayout();

  if (isMobile) {
    return (
      <div className='flex h-dvh w-full flex-col overflow-hidden'>
        <main className='relative w-full flex-1 overflow-hidden'>
          {children}
        </main>
        <footer className='z-50 w-full flex-none border-t border-t-gray-300 bg-white pb-[env(safe-area-inset-bottom)]'>
          <MobileFooter />
        </footer>
      </div>
    );
  }
  return (
    <div className='grid grid-cols-[80px_1fr] overflow-hidden'>
      <DesktopSnb />
      {children}
    </div>
  );
}
