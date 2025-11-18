'use client';

import { useState } from 'react';

import { cn } from '@muroom/lib';

import { ResetIcon } from '@muroom/icons';

import { FilterWrapper, OptionItem } from '../components';

const SIZE_OPTIONS = [
  '전체',
  '~1900',
  '2000~2900',
  '3000~3900',
  '4000~4900',
  '5000~',
];

export default function SizeFilter() {
  const [unit, setUnit] = useState<'cm' | 'mm'>('cm');

  const [rowSize, setRowSize] = useState('전체'); // 임시로 string;
  const [colSize, setColSize] = useState('전체'); // 임시로 string;

  return (
    <FilterWrapper
      title='사이즈'
      titleChildren={
        <span className='text-base-m-14-1 text-gray-500'>가로는 방의 긴면</span>
      }
      headerChildren={
        <div
          aria-label='toggle-btn'
          className={cn(
            'flex-center rounded-4 text-base-m-14-1 inline-flex cursor-pointer gap-x-1 border border-gray-300 bg-white px-1.5',
            'hover:bg-gray-100 hover:opacity-80',
          )}
        >
          <span>cm</span>
          <ResetIcon className='size-4 rotate-90' />
        </div>
      }
    >
      <div className='flex flex-col gap-y-4'>
        <div className='flex gap-x-1'>
          <span className='text-base-l-16-2'>가로</span>
          <span className='text-base-m-14-1 text-gray-500'>{unit}</span>
        </div>
        <div className='grid w-full grid-cols-3 gap-[5.5px]'>
          {SIZE_OPTIONS.map((item) => (
            <OptionItem
              key={item}
              item={item}
              selected={rowSize === item}
              onClick={() => setRowSize(item)}
            />
          ))}
        </div>
      </div>

      <div className='h-px bg-gray-300' />

      <div className='flex flex-col gap-y-4'>
        <div className='flex gap-x-1'>
          <span className='text-base-l-16-2'>세로</span>
          <span className='text-base-m-14-1 text-gray-500'>{unit}</span>
        </div>
        <div className='grid w-full grid-cols-3 gap-[5.5px]'>
          {SIZE_OPTIONS.map((item) => (
            <OptionItem
              key={item}
              item={item}
              selected={colSize === item}
              onClick={() => setColSize(item)}
            />
          ))}
        </div>
      </div>
    </FilterWrapper>
  );
}
