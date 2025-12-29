'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Pagination } from '@muroom/components';

import Loading from '@/app/loading';
import ListSortFilter, {
  SortOption,
} from '@/components/common/list-sort-filter';
import { useStudioBoastsQuery } from '@/hooks/api/studio-boasts/useQueries';
import { useScrollToTop } from '@/hooks/common/useScrollToTop';
import {
  StudioBoastsItemProps,
  StudioBoastsRequestProps,
} from '@/types/studio-boasts';
import { extractInfiniteData } from '@/utils/query';

import BoastThumnailCard from '../components/boast-thumnail-card';

const STUDIO_SORT_OPTIONS: SortOption[] = [
  { label: '선택', value: '' },
  { label: '최신순', value: 'latest,desc' },
  { label: '좋아요순', value: 'likes,desc' },
];

export default function DesktopStudioBoastsPage() {
  const searchParams = useSearchParams();

  const isMyTab = searchParams.get('my') === 'true';

  const [sort, setSort] = useState<StudioBoastsRequestProps['sort'] | ''>('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [isMyTab, sort]);

  useScrollToTop(page, 'page-scroll-container');

  const { data: studioBoastsData, isLoading: isStudioBoastsLoading } =
    useStudioBoastsQuery(
      { sort: sort || undefined },
      {
        page,
        size: 12,
        isMobile: false,
        isMyList: isMyTab,
      },
    );

  const { content: studioBoastList, pagination } =
    extractInfiniteData<StudioBoastsItemProps>(studioBoastsData, false);

  if (isStudioBoastsLoading) {
    return <Loading />;
  }

  return (
    <div className='w-full'>
      <div className='flex-between p-4'>
        <span className='text-base-exl-18-2'>
          {studioBoastsData?.pages[0]?.pagination.totalElements}개
        </span>
        <ListSortFilter
          currentSort={sort as string}
          options={STUDIO_SORT_OPTIONS}
          onSortChange={(val) => {
            setSort(val as StudioBoastsRequestProps['sort'] | '');
          }}
        />
      </div>
      <div className='grid grid-cols-3 gap-6'>
        {studioBoastList.map((item) => (
          <BoastThumnailCard
            key={item.id}
            targetedId={item.id}
            thumbnailSrcUrl={item.thumbnailImageFileUrl}
            isLike={item.isLikedByRequestUser}
          />
        ))}
      </div>

      <div className='flex-center mt-20'>
        {pagination && pagination.totalElements > 12 && (
          <Pagination
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
