'use client';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

import DesktopWelcomeLayout from './desktop';
import MobileWelcomeLayout from './mobile';

interface Props {
  children: React.ReactNode;
}

export default function WelcomeLayout({ children }: Props) {
  const { isMobile, isMounted } = useResponsiveLayout();

  if (!isMounted) {
    return null;
  }

  return isMobile ? (
    <MobileWelcomeLayout>{children}</MobileWelcomeLayout>
  ) : (
    <DesktopWelcomeLayout>{children}</DesktopWelcomeLayout>
  );
}
