'use client';

import { Button } from '@muroom/components';
import { ResetIcon } from '@muroom/icons';

import Loading from '@/app/loading';
import CommonDetailStudio from '@/components/common/detail-studio';
import CommonMap from '@/components/common/map';
import FilterItem, { Variant } from '@/components/home/components/filter-item';
import { useFilters } from '@/hooks/nuqs/home/useFilters';
import { MapState } from '@/hooks/nuqs/home/useMapState';
import { Studio } from '@/types/studio';
import { StudiosMapSearchItem } from '@/types/studios';

import ListFilter from '../components/list-filter';
import ListView from '../components/list-view';

interface Props {
  mapValue: MapState;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
  filters: ReturnType<typeof useFilters>['filters'];
  setFilters: ReturnType<typeof useFilters>['setFilters'];
  clearFilters: () => void;
  studios: Studio[];
  detailStudio: Studio;
  markersData: StudiosMapSearchItem[];
  isLoading: boolean;
}

const FILTER_VARIANTS: Variant[] = ['e1', 'e2', 'e3', 'e4', 'e5'];

export default function DesktopHomePage({
  mapValue,
  setMapValue,
  filters,
  setFilters,
  clearFilters,
  studios,
  detailStudio,
  markersData,
  isLoading,
}: Props) {
  const gridTemplateColumns = mapValue.studioId
    ? '375px 375px 1fr'
    : '375px 1fr';

  const hasActiveFilter = Object.values(filters).some(
    (value) => value !== null,
  ); // filter중에 선택된게 하나라도 있는지

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
          className='mb-[92px] grid min-h-0 flex-1'
          style={{
            gridTemplateColumns,
            transition: 'grid-template-columns 0.2s',
          }}
        >
          <div className='flex h-full min-h-0 flex-col border-r border-r-gray-300 bg-white'>
            <ListFilter />
            <div className='min-h-0 flex-1 overflow-y-scroll'>
              <ListView
                studios={studios}
                mapValue={mapValue}
                setMapValue={setMapValue}
              />
            </div>
          </div>

          {detailStudio && (
            <div className='shadow-detail flex h-full min-h-0 flex-col border-r-[0.5px] border-gray-300 bg-white'>
              <CommonDetailStudio
                detailStudio={detailStudio}
                setStudioId={(id: string) =>
                  setMapValue((prev) => ({
                    ...prev,
                    studioId: prev.studioId === id ? null : id,
                  }))
                }
              />
            </div>
          )}

          <div className='h-full w-full'>
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
