import { headers } from 'next/headers';

import LayoutSwitcher from '@/layouts/layout-switcher';

function isMobileDevice(userAgent: string): boolean {
  return /Mobi|Android|iPhone|iPod|iPad/i.test(userAgent);
}

interface Props {
  children: React.ReactNode;
}

export default async function BaseLayout({ children }: Props) {
  const userAgent = (await headers()).get('user-agent') || '';
  const serverIsMobile = isMobileDevice(userAgent);

  return (
    <LayoutSwitcher serverIsMobile={serverIsMobile}>{children}</LayoutSwitcher>
  );
}
