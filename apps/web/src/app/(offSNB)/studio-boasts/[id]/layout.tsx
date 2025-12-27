'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useResponsiveLayout();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && isMobile) {
      router.replace('/home');
    }
  }, [isMobile, isMounted, router]);

  if (!isMounted || isMobile) {
    return null;
  }

  return <>{children}</>;
}
