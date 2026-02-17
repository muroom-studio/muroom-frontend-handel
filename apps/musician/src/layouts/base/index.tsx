'use client';

import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

import BaseDesktopLayout from './desktop';
import BaseMobileLayout from './mobile';

interface Props {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: Props) {
  const { isMobile, isMounted } = useResponsiveLayout();

  if (!isMounted) {
    return null;
  }

  return isMobile ? (
    <BaseMobileLayout>{children}</BaseMobileLayout>
  ) : (
    <BaseDesktopLayout>{children}</BaseDesktopLayout>
  );
}
