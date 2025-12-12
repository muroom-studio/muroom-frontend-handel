'use client';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

import OnSNBDesktopLayout from './desktop';
import OnSNBMobileLayout from './mobile';

interface Props {
  children: React.ReactNode;
}

export default function OnSNBLayout({ children }: Props) {
  const { isMobile } = useResponsiveLayout();

  return isMobile ? (
    <OnSNBMobileLayout>{children}</OnSNBMobileLayout>
  ) : (
    <OnSNBDesktopLayout>{children}</OnSNBDesktopLayout>
  );
}
