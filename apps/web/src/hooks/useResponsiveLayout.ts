'use client';

import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useResponsiveLayout() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const userAgent = navigator.userAgent;
    const deviceIsMobile = /Mobi|Android|iPhone|iPod|iPad/i.test(userAgent);

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    if (deviceIsMobile) {
      setIsMobile(true);
    } else {
      handleResize();
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isMounted };
}
