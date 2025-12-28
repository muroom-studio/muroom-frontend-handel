'use client';

import { useEffect, useRef } from 'react';

import { Button, Spinner } from '@muroom/components';
import { ResetIcon } from '@muroom/icons';

import Loading from '@/app/loading';
import CommonDetailStudio from '@/components/common/detail-studio';
import CommonMap from '@/components/common/map';
import FilterItem, { Variant } from '@/components/home/components/filter-item';
import { useFilters } from '@/hooks/nuqs/home/useFilters';
import { MapState } from '@/hooks/nuqs/home/useMapState';
import { useSort } from '@/hooks/nuqs/home/useSort';
import { StudioDetailResponseProps } from '@/types/studio';
import { StudiosMapListItem, StudiosMapSearchItem } from '@/types/studios';

import ListFilter from '../components/list-filter';
import ListView from '../components/list-view';

interface Props {
  mapValue: MapState;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
  filters: ReturnType<typeof useFilters>['filters'];
  setFilters: ReturnType<typeof useFilters>['setFilters'];
  sort: ReturnType<typeof useSort>['sort'];
  setSort: ReturnType<typeof useSort>['setSort'];
  clearFilters: () => void;
  studios: StudiosMapListItem[];
  listRef: React.RefObject<HTMLDivElement | null>;
  totalElements: number;
  detailStudio?: StudioDetailResponseProps;
  isDetailLoading?: boolean;
  markersData: StudiosMapSearchItem[];
  isLoading: boolean;
  isListLoading: boolean;
  // --- 추가된 Pagination & Infinite Scroll Props ---
  pagination: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

const FILTER_VARIANTS: Variant[] = ['e1', 'e2', 'e3', 'e4', 'e5'];

export default function DesktopHomePage({
  mapValue,
  setMapValue,
  filters,
  setFilters,
  clearFilters,
  sort,
  setSort,
  studios,
  listRef,
  totalElements,
  detailStudio,
  isDetailLoading,
  markersData,
  isLoading,
  isListLoading,
  pagination,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const gridTemplateColumns = mapValue.studioId
    ? '375px 375px 1fr'
    : '375px 1fr';

  const hasActiveFilter = Object.values(filters).some(
    (value) => value !== null,
  );

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      window.dispatchEvent(new Event('resize'));
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='flex h-screen flex-1 flex-col'>
      <div className='flex h-full flex-col'>
        <div className='flex shrink-0 items-center gap-x-4 border-b border-b-gray-300 bg-white p-4'>
          {FILTER_VARIANTS.map((variant) => (
            <div aria-label='필터 박스' key={variant}>
              <FilterItem
                variant={variant}
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          ))}
          {hasActiveFilter && (
            <Button
              variant='outline_icon'
              size='l'
              className='ml-2 size-11'
              onClick={clearFilters}
            >
              <ResetIcon className='size-6' />
            </Button>
          )}
        </div>

        <div
          className='mb-23 grid min-h-0 flex-1'
          style={{
            gridTemplateColumns,
            transition: 'grid-template-columns 0.2s ease-in-out',
          }}
        >
          <div className='flex h-full min-h-0 flex-col border-r border-r-gray-300 bg-white'>
            <ListFilter
              studioNum={totalElements}
              currentSort={sort}
              onSortChange={(val) => setSort(val)}
            />
            <div ref={listRef} className='min-h-0 flex-1 overflow-y-scroll'>
              <ListView
                studios={studios}
                mapValue={mapValue}
                setMapValue={setMapValue}
                isLoading={isListLoading}
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={pagination.onPageChange}
              />
            </div>
          </div>

          {mapValue.studioId && (
            <div className='shadow-detail flex h-full min-h-0 flex-col border-r-[0.5px] border-gray-300 bg-white'>
              {isDetailLoading ? (
                <div className='flex-center size-full'>
                  <Spinner variant='component' />
                </div>
              ) : detailStudio ? (
                <CommonDetailStudio
                  detailStudio={detailStudio}
                  setStudioId={(id: string) =>
                    setMapValue((prev) => ({
                      ...prev,
                      studioId: prev.studioId === id ? null : id,
                    }))
                  }
                />
              ) : null}
            </div>
          )}

          <div ref={mapContainerRef} className='h-full w-full'>
            <CommonMap
              mapValue={mapValue}
              setMapValue={setMapValue}
              markers={markersData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
