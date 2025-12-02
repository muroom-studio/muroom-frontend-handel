'use client';

import { useState } from 'react';

import { ResetIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import OptionItem from '@/components/common/option-item';

import { FilterWrapper } from '../components';

interface Props {
  minRoomWidth: number | null;
  maxRoomWidth: number | null;
  minRoomHeight: number | null;
  maxRoomHeight: number | null;
  onChange: (vals: {
    minRoomWidth: number | null;
    maxRoomWidth: number | null;
    minRoomHeight: number | null;
    maxRoomHeight: number | null;
  }) => void;
}

const BASE_OPTIONS = [
  '전체',
  '~1900',
  '2000~2900',
  '3000~3900',
  '4000~4900',
  '5000~',
];

export default function SizeFilter({
  minRoomWidth,
  maxRoomWidth,
  minRoomHeight,
  maxRoomHeight,
  onChange,
}: Props) {
  const [unit, setUnit] = useState<'cm' | 'mm'>('mm');

  const parseOption = (option: string) => {
    if (option === '전체') return { min: null, max: null };

    if (option.startsWith('~')) {
      return { min: 0, max: Number(option.slice(1)) };
    }

    if (option.endsWith('~')) {
      return { min: Number(option.slice(0, -1)), max: null };
    }

    const [minStr, maxStr] = option.split('~');
    return { min: Number(minStr), max: Number(maxStr) };
  };

  const handleSelect = (type: 'width' | 'height', option: string) => {
    const { min, max } = parseOption(option);

    if (type === 'width') {
      onChange({
        minRoomWidth: min,
        maxRoomWidth: max,
        minRoomHeight,
        maxRoomHeight,
      });
    } else {
      onChange({
        minRoomWidth,
        maxRoomWidth,
        minRoomHeight: min,
        maxRoomHeight: max,
      });
    }
  };

  const isSelected = (type: 'width' | 'height', option: string) => {
    const { min, max } = parseOption(option);
    const currentMin = type === 'width' ? minRoomWidth : minRoomHeight;
    const currentMax = type === 'width' ? maxRoomWidth : maxRoomHeight;

    return currentMin === min && currentMax === max;
  };

  const getDisplayLabel = (option: string) => {
    if (unit === 'mm' || option === '전체') return option;

    return option.replace(/\d+/g, (match) => String(Number(match) / 10));
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'cm' ? 'mm' : 'cm'));
  };

  return (
    <FilterWrapper
      title='사이즈'
      onReset={() =>
        onChange({
          minRoomWidth: null,
          maxRoomWidth: null,
          minRoomHeight: null,
          maxRoomHeight: null,
        })
      }
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
          <span onClick={toggleUnit}>{unit}</span>
        </div>
      }
    >
      {/* 가로 섹션 */}
      <div className='flex flex-col gap-y-4'>
        <div className='flex gap-x-1'>
          <span className='text-base-l-16-2'>가로</span>
          <span className='text-base-m-14-1 text-gray-500'>{unit}</span>
        </div>
        <div className='grid w-full grid-cols-3 gap-[5.5px]'>
          {BASE_OPTIONS.map((item) => (
            <OptionItem
              key={item}
              item={getDisplayLabel(item)} // 화면에는 변환된 텍스트 표시
              selected={isSelected('width', item)} // 비교는 원본(mm) 기준
              onClick={() => handleSelect('width', item)} // 저장도 원본(mm) 기준
            />
          ))}
        </div>
      </div>

      <div className='h-px bg-gray-300' />

      {/* 세로 섹션 */}
      <div className='flex flex-col gap-y-4'>
        <div className='flex gap-x-1'>
          <span className='text-base-l-16-2'>세로</span>
          <span className='text-base-m-14-1 text-gray-500'>{unit}</span>
        </div>
        <div className='grid w-full grid-cols-3 gap-[5.5px]'>
          {BASE_OPTIONS.map((item) => (
            <OptionItem
              key={item}
              item={getDisplayLabel(item)}
              selected={isSelected('height', item)}
              onClick={() => handleSelect('height', item)}
            />
          ))}
        </div>
      </div>
    </FilterWrapper>
  );
}
