'use client';

import { useEffect, useState } from 'react';

import { ResetIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import OptionItem from '@/components/common/option-item';

import { FilterWrapper } from '../components';

interface Props {
  value: string;
  onValueChange: (newValue: string) => void;
}

export default function SizeFilter({ value, onValueChange }: Props) {
  const [unit, setUnit] = useState<'cm' | 'mm'>('mm');

  // 1. 초기값 파싱: "가로,세로" 형태의 문자열을 쪼개서 상태로 설정
  // 값이 없거나 형식이 안 맞으면 기본값 '전체' 사용
  const [initialRow, initialCol] = value ? value.split(',') : ['전체', '전체'];

  const [rowSize, setRowSize] = useState(initialRow || '전체');
  const [colSize, setColSize] = useState(initialCol || '전체');

  // 2. 내부 값이 변할 때마다 부모에게 알림 (가로,세로 포맷)
  useEffect(() => {
    const newValue = `${rowSize},${colSize}`;

    if (value !== newValue) {
      onValueChange(newValue);
    }
  }, [rowSize, colSize, onValueChange, value]);

  const SIZE_OPTIONS =
    unit === 'mm'
      ? ['전체', '~1900', '2000~2900', '3000~3900', '4000~4900', '5000~']
      : ['전체', '~190', '200~290', '300~390', '400~490', '500~'];

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'cm' ? 'mm' : 'cm'));
    setRowSize('전체');
    setColSize('전체');
  };

  return (
    <FilterWrapper
      title='사이즈'
      titleChildren={
        <span className='text-base-m-14-1 text-gray-500'>가로는 방의 긴면</span>
      }
      headerChildren={
        <div
          aria-label='toggle-btn'
          onClick={toggleUnit}
          className={cn(
            'flex-center rounded-4 text-base-m-14-1 inline-flex cursor-pointer gap-x-1 border border-gray-300 bg-white px-1.5',
            'hover:bg-gray-100 hover:opacity-80',
          )}
        >
          <span>{unit}</span>
          <ResetIcon className='size-4 rotate-90' />
        </div>
      }
    >
      <div className='flex flex-col gap-y-4'>
        <div className='flex gap-x-1'>
          <span className='text-base-l-16-2'>가로</span>
          {/* 현재 선택된 단위(unit)를 보여줍니다 */}
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
