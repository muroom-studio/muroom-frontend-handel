'use client';

import { useRangeInput } from '@/hooks/useRangeInput';

import { Slider } from '@muroom/components';

import { FilterWrapper } from '../components';

export default function PriceFilter() {
  const { rangeValue, handleSliderChange, handleRangeChange, handleFocus } =
    useRangeInput({
      initialMin: 40,
      initialMax: 60,
      minBoundary: 0,
      maxBoundary: 100,
    });

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
