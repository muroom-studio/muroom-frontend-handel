'use client';

import { useEffect } from 'react';

import { Slider } from '@muroom/components';

import { useRangeInput } from '@/hooks/useRangeInput';

import { FilterWrapper } from '../components';

interface Props {
  value: string;
  onValueChange: (newValue: string) => void;
}

export default function PriceFilter({ value, onValueChange }: Props) {
  const [initialMin, initialMax] = value
    ? value.split(',').map(Number)
    : [40, 60];

  const { rangeValue, handleSliderChange, handleRangeChange, handleFocus } =
    useRangeInput({
      initialMin: initialMin || 40,
      initialMax: initialMax || 60,
      minBoundary: 0,
      maxBoundary: 100,
    });

  useEffect(() => {
    const newValue = `${rangeValue.minValue},${rangeValue.maxValue}`;

    if (value !== newValue) {
      onValueChange(newValue);
    }
  }, [rangeValue, onValueChange, value]);

  return (
    <FilterWrapper title='가격'>
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
