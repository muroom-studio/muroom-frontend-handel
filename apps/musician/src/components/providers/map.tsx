'use client';

import { NavermapsProvider } from 'react-naver-maps';

export default function MapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavermapsProvider
      ncpClientId={process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID || ''}
    >
      {children}
    </NavermapsProvider>
  );
}
