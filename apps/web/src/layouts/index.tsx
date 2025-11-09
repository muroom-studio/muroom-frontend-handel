import { headers } from 'next/headers';

import LayoutSwitcher from '@/layouts/layout-switcher';

function isMobileDevice(userAgent: string): boolean {
  return /Mobi|Android|iPhone|iPod|iPad/i.test(userAgent);
}

export default async function HomeLayout() {
  const userAgent = (await headers()).get('user-agent') || '';
  const serverIsMobile = isMobileDevice(userAgent);

  return <LayoutSwitcher serverIsMobile={serverIsMobile} />;
}
