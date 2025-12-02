'use client';

import { useEffect, useRef } from 'react';

import { Slider } from '@muroom/components';

import { useRangeInput } from '@/hooks/useRangeInput';

import { FilterWrapper } from '../components';

interface Props {
  minPrice: number | null;
  maxPrice: number | null;
  onChange: (min: number, max: number) => void;
  onReset: () => void;
}

export default function PriceFilter({
  minPrice,
  maxPrice,
  onChange,
  onReset,
}: Props) {
  const targetMin = minPrice ?? 40;
  const targetMax = maxPrice ?? 60;

  const {
    rangeValue,
    setRangeValue,
    handleSliderChange,
    handleRangeChange,
    handleFocus,
  } = useRangeInput({
    initialMin: targetMin,
    initialMax: targetMax,
    minBoundary: 0,
    maxBoundary: 100,
  });

  useEffect(() => {
    if (
      rangeValue.minValue !== targetMin ||
      rangeValue.maxValue !== targetMax
    ) {
      setRangeValue({ minValue: targetMin, maxValue: targetMax });
    }
  }, [targetMin, targetMax]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        rangeValue.minValue !== targetMin ||
        rangeValue.maxValue !== targetMax
      ) {
        onChange(rangeValue.minValue, rangeValue.maxValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [rangeValue, onChange]);

  return (
    <FilterWrapper title='가격' onReset={onReset}>
      <Slider
        id='price-range'
        value={[rangeValue.minValue, rangeValue.maxValue]}
        onValueChange={handleSliderChange}
        className='w-full'
      />
      <div className='flex-between w-full gap-x-2'>
        <div className='flex-between rounded-4 min-w-0 flex-1 border border-gray-300 px-4 py-3'>
          <input
            className='text-base-l-16-2 min-w-0 flex-1 appearance-none outline-none'
            inputMode='numeric'
            pattern='[0-9]*'
            name='minValue'
            value={rangeValue.minValue}
            onChange={handleRangeChange}
            onFocus={handleFocus}
          />
          <span className='text-base-l-16-1 ml-2 shrink-0'>만원</span>
        </div>

        <span className='text-base-l-16-2 shrink-0'>~</span>

        <div className='flex-between rounded-4 min-w-0 flex-1 border border-gray-300 px-4 py-3'>
          <input
            className='text-base-l-16-2 min-w-0 flex-1 appearance-none outline-none'
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            name='maxValue'
            value={rangeValue.maxValue}
            onChange={handleRangeChange}
            onFocus={handleFocus}
          />
          <span className='text-base-l-16-1 ml-2 shrink-0'>만원</span>
        </div>
      </div>
    </FilterWrapper>
  );
}
