'use client';

import { useState } from 'react';

import FilterItem, { Variant } from '@/components/home/components/filter-item';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  ToggleButton,
} from '@muroom/components';
import { FileIcon } from '@muroom/icons';

const SORT_OPTIONS = [
  '선택',
  '추천순',
  '최신순',
  '리뷰많은순',
  '평점높은순',
  '높은가격순',
  '낮은가격순',
];

export default function DesktopHomePage() {
  const [filteredValue, setFilteredValue] = useState<Record<Variant, string>>({
    e1: '',
    e2: '',
    e3: '',
    e4: '',
    e5: '',
  });

  return (
    <div className='flex flex-1 flex-col'>
      <div className='z-10 flex items-center gap-x-4 border-b border-b-gray-300 p-4'>
        {Object.entries(filteredValue).map(([key, value]) => (
          <div aria-label='필터 박스' key={key}>
            <FilterItem variant={key as Variant} value={value} />
          </div>
        ))}
      </div>
      <div className='grid grid-cols-[375px_1fr]'>
        <div className='flex-between border-b border-b-gray-300 p-4'>
          {/* 탐색된 스튜디오 갯수 */}
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
        <div></div>
      </div>
    </div>
  );
}
