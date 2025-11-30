'use client';

import DesktopLoginPage from './desktop';
import MobileLoginPage from './mobile';

interface Props {
  isMobile: boolean;
}

export default function LoginPage({ isMobile }: Props) {
  const content = isMobile ? <MobileLoginPage /> : <DesktopLoginPage />;

  return <main className='h-full'>{content}</main>;
}
