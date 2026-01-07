'use client';

import { useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Spinner } from '@muroom/components';

import Loading from '@/app/loading';
import PageWrapper from '@/components/common/page-wrapper';
import { useStudioBoastsQuery } from '@/hooks/api/studio-boasts/useQueries';
import { StudioBoastsItemProps } from '@/types/studio-boasts';
import { extractInfiniteData } from '@/utils/query';

import BoastEventBanner from '../components/boast-event-banner';
import DetailBoastList from './detail-boast-list';
import FloatingPostButton from './floating-post-button';
import MobileStudioBoastsTabBar from './mobile-tabBar';

export default function MobileStudioBoastsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isMyTab = searchParams.get('my') === 'true';

  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data: studioBoastsData,
    isLoading: isStudioBoastsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useStudioBoastsQuery(
    { sort: undefined },
    {
      page: 1,
      size: 12,
      isMobile: true,
      isMyList: isMyTab,
    },
  );

  const { content: studioBoastList } =
    extractInfiniteData<StudioBoastsItemProps>(studioBoastsData, true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isStudioBoastsLoading) {
    return <Loading />;
  }

  return (
    <PageWrapper
      isMobile
      isHeader={{
        title: '작업실 자랑하기',
        onBackClick: () => router.back(),
      }}
      contentClassName='px-0 pt-0'
    >
      <div className='flex flex-col pb-20'>
        <MobileStudioBoastsTabBar />
        <BoastEventBanner isMobile className='-translate-y-0.5' />
        {studioBoastList.length === 0 ? (
          <div className='flex-center my-25'>
            <p className='text-base-l-16-1 whitespace-pre-wrap text-center text-gray-400'>{`현재 작성된 글이 없습니다. \n첫 글을 작성해볼까요?`}</p>
          </div>
        ) : (
          <>
            <div className='h-6' />
            <DetailBoastList items={studioBoastList} />
          </>
        )}

        <div ref={observerRef} className='flex-center h-10 w-full py-4'>
          {isFetchingNextPage && <Spinner variant='component' />}
        </div>
      </div>

      <FloatingPostButton />
    </PageWrapper>
  );
}
