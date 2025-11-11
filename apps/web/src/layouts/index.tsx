'use client';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

import MobileBaseLayout from '@/layouts/mobile-layout/base';
import DesktopBaseLayout from '@/layouts/desktop-layout/base';

interface Props {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: Props) {
  const { isMobile, isMounted } = useResponsiveLayout();

  if (!isMounted) {
    return null;
  }

  return isMobile ? (
    <MobileBaseLayout>{children}</MobileBaseLayout>
  ) : (
    <DesktopBaseLayout>{children}</DesktopBaseLayout>
  );
}
