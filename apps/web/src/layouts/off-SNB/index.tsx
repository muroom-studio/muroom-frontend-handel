'use client';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

import OffSNBDesktopLayout from './desktop';
import OffSNBMobileLayout from './mobile';

interface Props {
  children: React.ReactNode;
}

export default function OffSNBLayout({ children, ...props }: Props) {
  const { isMobile } = useResponsiveLayout();

  const LayoutComponent = isMobile ? OffSNBMobileLayout : OffSNBDesktopLayout;

  return <LayoutComponent {...props}>{children}</LayoutComponent>;
}
