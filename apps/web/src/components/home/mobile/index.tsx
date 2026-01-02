'use client';

import { useEffect } from 'react';

import { notFound } from 'next/navigation';

import { AnimatePresence, motion, useMotionValue } from 'framer-motion';

import { BottomSheet } from '@muroom/components';

import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import CommonDetailStudio from '@/components/common/detail-studio';
import CommonMap from '@/components/common/map';
import { MapState } from '@/hooks/nuqs/home/useMapState';
import { useSort } from '@/hooks/nuqs/home/useSort';
import { useEventModal } from '@/hooks/useEventModal.tsx';
import { StudioDetailResponseProps } from '@/types/studio';
import { StudiosMapListItem, StudiosMapSearchItem } from '@/types/studios';

import ListFilter from '../components/list-filter';
import ListView from '../components/list-view';

interface Props {
  mapValue: MapState;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
  sort: ReturnType<typeof useSort>['sort'];
  setSort: ReturnType<typeof useSort>['setSort'];
  studios: StudiosMapListItem[];
  totalElements: number;
  detailStudio?: StudioDetailResponseProps;
  isDetailLoading?: boolean;
  markersData: StudiosMapSearchItem[];
  isLoading: boolean;

  infiniteScroll: {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
  };
}

// 상수 설정
const SHEET_CONFIG = {
  topMargin: 118,
  middleRatio: 0.4,
  minHeight: 80,
  footerHeight: 64,
};

export default function MobileHomePage({
  mapValue,
  setMapValue,
  sort,
  setSort,
  studios,
  totalElements,
  detailStudio,
  isDetailLoading,
  markersData,
  isLoading,
  infiniteScroll,
}: Props) {
  const sheetY = useMotionValue(0);

  const { EventModal } = useEventModal();

  if (isLoading) {
    return <Loading />;
  }

  if (mapValue.studioId && !isDetailLoading && !detailStudio) {
    return <NotFound />;
  }

  return (
    <div className='relative flex h-screen flex-1 flex-col overflow-hidden'>
      <div className='h-full w-full'>
        {EventModal}
        <CommonMap
          mapValue={mapValue}
          setMapValue={setMapValue}
          markers={markersData}
          sheetY={sheetY}
          middleRatio={SHEET_CONFIG.middleRatio}
        />
      </div>

      <BottomSheet
        {...SHEET_CONFIG}
        header={
          <ListFilter
            studioNum={totalElements}
            currentSort={sort}
            onSortChange={(val) => setSort(val)}
          />
        }
        externalY={sheetY}
      >
        <ListView
          studios={studios}
          mapValue={mapValue}
          setMapValue={setMapValue}
          // 모바일 전용 설정
          isMobile={true}
          hasNextPage={infiniteScroll.hasNextPage}
          isFetchingNextPage={infiniteScroll.isFetchingNextPage}
          fetchNextPage={infiniteScroll.fetchNextPage}
        />
      </BottomSheet>

      <AnimatePresence>
        {detailStudio && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='z-100 fixed inset-0 flex flex-col bg-white'
          >
            <CommonDetailStudio
              detailStudio={detailStudio}
              setStudioId={(id: string) =>
                setMapValue((prev) => ({
                  ...prev,
                  studioId: prev.studioId === id ? null : id,
                }))
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
