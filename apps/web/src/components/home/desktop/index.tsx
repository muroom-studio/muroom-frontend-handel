'use client';

import { useState } from 'react';

import FilterItem, { Variant } from '@/components/home/components/filter-item';

import ListView from './list-view';
import ListFilter from './list-filter';

import CommonMap from '@/components/common/map';

const DEFAULT_CENTER = {
  lat: 37.566,
  lng: 126.978,
};

const DUMMY_MARKERS = [
  { id: 'e1', lat: 37.567, lng: 126.979, label: '95~110만원' },
  { id: 'e2', lat: 37.565, lng: 126.977, label: '30~50만원' },
  { id: 'e3', lat: 37.567, lng: 126.977, label: '55~70만원' },
];

export interface MapState {
  center: { lat: number; lng: number };
  zoom: number;
  selectedId: string | null;
}

export default function DesktopHomePage() {
  const [filteredValue, setFilteredValue] = useState<Record<Variant, string>>({
    e1: '',
    e2: '',
    e3: '',
    e4: '',
    e5: '',
  });

  const [mapValue, setMapValue] = useState<MapState>({
    center: DEFAULT_CENTER,
    zoom: 15,
    selectedId: null,
  });

  return (
    <div className='flex h-screen flex-1 flex-col'>
      <div className='flex h-full flex-col'>
        <div className='flex shrink-0 items-center gap-x-4 border-b border-b-gray-300 bg-white p-4'>
          {Object.entries(filteredValue).map(([key, value]) => (
            <div aria-label='필터 박스' key={key}>
              <FilterItem variant={key as Variant} value={value} />
            </div>
          ))}
        </div>

        <div className='mb-[92px] grid min-h-0 flex-1 grid-cols-[375px_1fr]'>
          <div className='flex h-full min-h-0 flex-col border-r border-r-gray-300 bg-white'>
            {/* list-filter는 서버로부터 받은 데이터 필터링하는 용도 */}
            <ListFilter />

            <div className='min-h-0 flex-1 overflow-y-scroll'>
              {/* list-view는 서버로부터 받은 데이터 표출하는 용도 */}
              <ListView />
            </div>
          </div>

          <div className='h-full w-full'>
            <CommonMap
              mapValue={mapValue}
              setMapValue={setMapValue}
              markers={DUMMY_MARKERS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
