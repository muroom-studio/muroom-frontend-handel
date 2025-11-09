'use client';

import { useWindowDetect } from '@/hooks/useWindowDetect';

import DesktopLayout from '@/layouts/desktop-layout';
import MobileLayout from '@/layouts/mobile-layout';

interface Props {
  serverIsMobile: boolean;
  children: React.ReactNode;
}

export default function LayoutSwitcher({ serverIsMobile, children }: Props) {
  const { isMobile: clientIsMobile, isMounted } = useWindowDetect();

  if (!isMounted) {
    return serverIsMobile ? (
      <MobileLayout>{children}</MobileLayout>
    ) : (
      <DesktopLayout>{children}</DesktopLayout>
    );
  }

  return clientIsMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}
