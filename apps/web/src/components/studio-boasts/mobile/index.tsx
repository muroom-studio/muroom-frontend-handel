'use client';

import { useRouter } from 'next/navigation';

import PageWrapper from '@/components/common/page-wrapper';

export default function MobileStudioBoastsPage() {
  const router = useRouter();

  return (
    <PageWrapper
      isMobile
      isHeader={{
        title: '작업실 자랑하기',
        onBackClick: () => router.back(),
      }}
    >
      모바일 자랑
    </PageWrapper>
  );
}
