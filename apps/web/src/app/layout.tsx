import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import { NuqsAdapter } from 'nuqs/adapters/next';

import MapProvider from '@/components/providers/map-provider';
import RQProvider from '@/components/providers/rq-provider';
import SonnerProvider from '@/components/providers/sonner-provider';
import { NCP_CLIENT_ID } from '@/config/constants';
import BaseLayout from '@/layouts/base';

import './globals.css';

const pretendard = localFont({
  src: '../../../../packages/tailwind-config/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '뮤룸 (Muroom) | 우리들만의 음악 공간',
  description: '뮤룸에서 쉽고 빠르게 뮤지션을 위한 음악 작업실을 올려보세요.',

  openGraph: {
    title: '뮤룸 (Muroom) | 우리들만의 음악 공간',
    description: '뮤룸에서 쉽고 빠르게 뮤지션을 위한 음악 작업실을 올려보세요.',
    url: 'https://muroom.kr',
    siteName: '뮤룸 (Muroom)',

    images: [
      {
        url: 'https://muroom.kr/images/screenshot.png',
        width: 1024,
        height: 576,
        alt: '뮤룸 로고',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={pretendard.className}>
        <RQProvider>
          <NuqsAdapter>
            <MapProvider>
              <BaseLayout>
                {children}
                {modal}
                <SonnerProvider />
              </BaseLayout>
            </MapProvider>
          </NuqsAdapter>
        </RQProvider>
        <Script
          strategy='afterInteractive'
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NCP_CLIENT_ID}`}
        />
      </body>
    </html>
  );
}
