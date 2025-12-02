'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Pagination, Spinner } from '@muroom/components';
import { VisitListIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import CommonStudioCard from '@/components/common/studio-card';
import { MapState } from '@/hooks/nuqs/home/useMapState';
import { StudiosMapListItem } from '@/types/studios';

interface Props {
  studios: StudiosMapListItem[];
  mapValue: MapState;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
  className?: string;
  isMobile?: boolean;
  isLoading?: boolean;

  // --- PC용 페이지네이션 Props (Optional) ---
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;

  // --- 모바일용 무한스크롤 Props (Optional) ---
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
}

export default function ListView({
  studios,
  mapValue,
  setMapValue,
  className,
  isMobile = false,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) {
  const { ref, inView } = useInView({
    threshold: 0,
    skip: !isMobile,
  });

  useEffect(() => {
    if (isMobile && inView && hasNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [isMobile, inView, hasNextPage, fetchNextPage]);

  const showPagination =
    !isMobile &&
    currentPage !== undefined &&
    totalPages !== undefined &&
    totalPages > 1 &&
    onPageChange;

  return (
    <div className={cn('flex flex-col', className)}>
      {/* [조건부 렌더링 순서]
        1. PC이면서 로딩 중인가? -> Spinner
        2. 데이터가 0개인가? -> Empty View
        3. 데이터가 있는가? -> List View
      */}
      {!isMobile && isLoading ? (
        <div className='flex h-60 w-full items-center justify-center'>
          <Spinner variant='component' />
        </div>
      ) : studios.length === 0 ? (
        <NoDataSection isMobile={isMobile} />
      ) : (
        <>
          {studios.map((studio) => (
            <CommonStudioCard
              key={studio.studioId}
              data={studio}
              currentStudioId={mapValue.studioId || ''}
              setMapValue={setMapValue}
            />
          ))}
        </>
      )}

      {/* --- [모바일 전용] 무한 스크롤 영역 --- */}
      {isMobile && (
        <div className='block py-4'>
          {isFetchingNextPage ? (
            <div className='flex justify-center py-4'>
              <Spinner variant='component' />
            </div>
          ) : (
            /* 로딩 중이 아닐 때 감지용 투명 div 배치 */
            <div ref={ref} className='h-4 w-full bg-transparent' />
          )}
        </div>
      )}

      {/* --- [PC 전용] 페이지네이션 영역 --- */}
      {!isLoading && showPagination && (
        <div className='pb-15 px-5 pt-10'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange!}
          />
        </div>
      )}
    </div>
  );
}

const NoDataSection = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div
      className={cn('flex-center-col mt-40 w-full gap-y-10', {
        'mt-10': isMobile,
      })}
    >
      <div className='flex-center-col flex gap-y-3'>
        <VisitListIcon className='size-11 text-gray-300' />
        <p className='text-base-l-16-1 text-center'>
          선택하신 위치에는
          <br />
          아직 작업실이 없습니다.
        </p>
      </div>
      <p className='text-base-l-16-2 text-primary-600 cursor-pointer underline decoration-1 underline-offset-4'>
        현재 위치에서 가장 가까운 작업실 찾기
      </p>
    </div>
  );
};
