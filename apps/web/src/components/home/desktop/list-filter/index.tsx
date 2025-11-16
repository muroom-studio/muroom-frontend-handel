'use client';

import { useState } from 'react';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  ToggleSlider,
} from '@muroom/components';

const SORT_OPTIONS = [
  '선택',
  '추천순',
  '최신순',
  '리뷰많은순',
  '평점높은순',
  '높은가격순',
  '낮은가격순',
];

export default function ListFilter() {
  const [isEmpty, setIsEmpty] = useState(false);
  return (
    <div className='flex-between h-14 border-b border-b-gray-300 p-4'>
      {/* <span className='text-base-exl-18-2 text-black'>75개</span> */}
      <ToggleSlider flag={isEmpty} setter={setIsEmpty} label='공실만 보기' />
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
  );
}
