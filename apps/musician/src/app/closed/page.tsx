import type { Metadata } from 'next';

import ServiceClosedNotice from '@/components/service-closed';

export const metadata: Metadata = {
  title: '뮤룸 (Muroom) 서비스 종료 안내',
  description: '뮤룸 서비스가 종료되었습니다.',
  robots: { index: false, follow: false },
};

export default function ServiceClosedPage() {
  return <ServiceClosedNotice />;
}
