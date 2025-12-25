'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@muroom/components';
import { PlusIcon } from '@muroom/icons';

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
      contentClassName='px-0 pt-0'
    >
      모바일 자랑
      <Button
        variant='primary'
        size='xl'
        className='shadow-level-2 absolute bottom-5 right-5'
        onClick={() => router.push('/studio-boasts/new')}
      >
        <PlusIcon className='size-6 text-white' />
        글쓰기
      </Button>
    </PageWrapper>
  );
}
