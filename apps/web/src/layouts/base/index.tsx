'use client';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

import DesktopBaseLayout from './desktop';
import MobileBaseLayout from './mobile';

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
