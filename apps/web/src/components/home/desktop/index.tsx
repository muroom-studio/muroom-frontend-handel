'use client';

import CommonDetailStudio from '@/components/common/detail-studio';
import CommonMap from '@/components/common/map';
import FilterItem, { Variant } from '@/components/home/components/filter-item';
import { useFilters } from '@/hooks/nuqs/home/useFilters';
import { MapState } from '@/hooks/nuqs/home/useMapState';
import { MarkerData } from '@/types/map/markers';
import { Studio } from '@/types/studio';

import ListFilter from '../components/list-filter';
import ListView from '../components/list-view';

interface Props {
  mapValue: MapState;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
  studios: Studio[];
  detailStudio: Studio;
  markersData: MarkerData[];
}

export default function DesktopHomePage({
  mapValue,
  setMapValue,
  studios,
  detailStudio,
  markersData,
}: Props) {
  const { filteredValue, setFilter } = useFilters();

  console.log(filteredValue, 'filteredValue');

  const gridTemplateColumns = mapValue.studioId
    ? '375px 375px 1fr'
    : '375px 1fr';

  return (
    <div className='flex h-screen flex-1 flex-col'>
      <div className='flex h-full flex-col'>
        <div className='flex shrink-0 items-center gap-x-4 border-b border-b-gray-300 bg-white p-4'>
          {Object.entries(filteredValue).map(([key, value]) => (
            <div aria-label='필터 박스' key={key}>
              <FilterItem
                variant={key as Variant}
                value={value ?? ''}
                onValueChange={(newValue) =>
                  setFilter(key as Variant, newValue)
                }
              />
            </div>
          ))}
        </div>

        <div
          className='mb-[92px] grid min-h-0 flex-1'
          style={{
            gridTemplateColumns,
            transition: 'grid-template-columns 0.2s',
          }}
        >
          <div className='flex h-full min-h-0 flex-col border-r border-r-gray-300 bg-white'>
            {/* list-filter는 서버로부터 받은 데이터 필터링하는 용도 */}
            <ListFilter />

            <div className='min-h-0 flex-1 overflow-y-scroll'>
              {/* list-view는 서버로부터 받은 데이터 표출하는 용도 */}
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
