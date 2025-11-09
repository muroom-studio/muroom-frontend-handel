'use client';

import { useWindowDetect } from '@/hooks/useWindowDetect';

import DesktopHomeLayout from '@/layouts/desktop-layout';
import MobileHomeLayout from '@/layouts/mobile-layout';

interface Props {
  serverIsMobile: boolean;
}

export default function LayoutSwitcher({ serverIsMobile }: Props) {
  const { isMobile: clientIsMobile, isMounted } = useWindowDetect();

  if (!isMounted) {
    return serverIsMobile ? <MobileHomeLayout /> : <DesktopHomeLayout />;
  }

  return clientIsMobile ? <MobileHomeLayout /> : <DesktopHomeLayout />;
}
