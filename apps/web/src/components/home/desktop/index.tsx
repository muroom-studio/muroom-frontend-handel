'use client';

import { useCallback, useState } from 'react';

import FilterItem, { Variant } from '@/components/home/components/filter-item';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@muroom/components';
import MapCanvas from '@/components/common/map/canvas';

const SORT_OPTIONS = [
  '선택',
  '추천순',
  '최신순',
  '리뷰많은순',
  '평점높은순',
  '높은가격순',
  '낮은가격순',
];

const DEFAULT_CENTER = {
  lat: 37.566,
  lng: 126.978,
};

const DUMMY_MARKERS = [
  { id: 1, lat: 37.567, lng: 126.979, label: '95~110만원' },
  { id: 2, lat: 37.565, lng: 126.977, label: '30~50만원' },
  { id: 3, lat: 37.567, lng: 126.977, label: '55~70만원' },
];

export default function DesktopHomePage() {
  const [filteredValue, setFilteredValue] = useState<Record<Variant, string>>({
    e1: '',
    e2: '',
    e3: '',
    e4: '',
    e5: '',
  });

  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER); // ⭐️ State는 여전히 부모가 소유합니다.

  const handleMarkerClick = useCallback((id: string | number) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  }, []);

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
          {/* 왼쪽 컨텐츠 */}
          <div className='flex h-full min-h-0 flex-col border-r border-r-gray-300 bg-white'>
            {/* 왼쪽 컨텐츠 헤더 */}
            <div className='flex-between shrink-0 border-b border-b-gray-300 p-4'>
              <span className='text-base-exl-18-2 text-black'>75개</span>
              <Dropdown placeholder='선택' className='w-24'>
                <DropdownTrigger variant='text' />
                <DropdownContent>
                  {SORT_OPTIONS.map((option) => (
                    <DropdownItem key={option} value={option}>
                      {option}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>

            {/* 왼쪽 컨텐츠 메인  */}
            <div className='min-h-0 flex-1 overflow-y-scroll'>
              <div className='h-[400px] bg-red-400'></div>
              <div className='h-[400px] bg-blue-400'></div>
              <div className='h-[400px] bg-yellow-400'></div>
              <div className='relative h-[400px] bg-green-400'>
                <p className='absolute bottom-0'>hi~</p>
              </div>
            </div>
          </div>

          <div className='h-full w-full'>
            <MapCanvas
              center={DEFAULT_CENTER}
              zoom={15}
              markers={DUMMY_MARKERS}
              onMarkerClick={handleMarkerClick}
              selectedId={selectedId}
              onLocationChange={setMapCenter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
