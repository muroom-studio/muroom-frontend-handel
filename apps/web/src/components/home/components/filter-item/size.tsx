'use client';

import { useState } from 'react';

import { cn } from '@muroom/lib';

import { Button } from '@muroom/components';
import { ResetIcon } from '@muroom/icons';

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
    <div className='flex w-full flex-col gap-y-5'>
      <div className='flex-between'>
        <div className='flex-center gap-x-2'>
          <span className='text-base-exl-18-2'>사이즈</span>
          <span className='text-base-m-14-1 text-gray-500'>
            가로는 방의 긴면
          </span>
        </div>
        <div className='flex items-stretch gap-x-2'>
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
          <Button variant='outline_icon' size='l' className='size-6'>
            <ResetIcon className='size-4' />
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-y-4'>
        <div className='flex gap-x-1'>
          <span className='text-base-l-16-2'>가로</span>
          <span className='text-base-m-14-1 text-gray-500'>{unit}</span>
        </div>
        <div className='grid w-full grid-cols-3 gap-[5.5px]'>
          {SIZE_OPTIONS.map((item) => (
            <Button
              key={item}
              variant='outline'
              className={cn(
                'h-9',
                rowSize === item
                  ? 'bg-primary-400 text-base-m-14-2 text-white'
                  : 'text-base-m-14-1',
              )}
              onClick={() => setRowSize(item)}
            >
              <p>{item}</p>
            </Button>
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
            <Button
              key={item}
              variant='outline'
              className={cn(
                'h-9',
                colSize === item
                  ? 'bg-primary-400 text-white'
                  : 'text-base-m-14-1',
              )}
              onClick={() => setColSize(item)}
            >
              <p>{item}</p>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
