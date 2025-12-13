'use client';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

import OnSNBDesktopLayout from './desktop';
import OnSNBMobileLayout from './mobile';

interface Props {
  children: React.ReactNode;
}

export default function OnSNBLayout({ children, ...props }: Props) {
  const { isMobile } = useResponsiveLayout();

  const LayoutComponent = isMobile ? OnSNBMobileLayout : OnSNBDesktopLayout;

  return <LayoutComponent {...props}>{children}</LayoutComponent>;
}
