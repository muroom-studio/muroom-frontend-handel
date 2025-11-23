'use client';

import FilterItem, { Variant } from '@/components/home/components/filter-item';

import CommonMap from '@/components/common/map';
import CommonDetailStudio from '@/components/common/detail-studio';

import ListView from './list-view';
import ListFilter from './list-filter';

import { useFilters } from '@/hooks/nuqs/home/useFilters';
import { useMapState } from '@/hooks/nuqs/home/useMapState';

import { DUMMY_STUDIO } from '@/types/studio';

export default function DesktopHomePage() {
  const dummyCenterLocation = { lat: 37.5559247, lng: 126.9250109 };

  const { filteredValue, setFilter } = useFilters();
  const [mapValue, setMapValue] = useMapState({
    center: dummyCenterLocation,
    zoom: 16,
  });

  const DUMMY_DATA = DUMMY_STUDIO; // 더미 작업실 data

  const DETAIL_DUMMY_DATA = DUMMY_DATA.find((d) => d.id === mapValue.studioId); // detail 더미 작업실 data

  const DUMMY_MARKER_DATA = DUMMY_DATA.map((studio) => ({
    id: studio.id,
    lat: studio.lat,
    lng: studio.lng,
    isAd: studio.isAd,
    name: studio.name,
    priceMin: studio.priceMin,
    priceMax: studio.priceMax,
  }));

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
                studios={DUMMY_DATA}
                studioId={mapValue.studioId || ''}
                setStudioId={(id: string) =>
                  setMapValue((prev) => ({
                    ...prev,
                    studioId: prev.studioId === id ? null : id,
                  }))
                }
              />
            </div>
          </div>

          {DETAIL_DUMMY_DATA && (
            <div className='shadow-detail flex h-full min-h-0 flex-col border-r-[0.5px] border-gray-300 bg-white'>
              <CommonDetailStudio
                detailStudio={DETAIL_DUMMY_DATA}
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
              markers={DUMMY_MARKER_DATA}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
