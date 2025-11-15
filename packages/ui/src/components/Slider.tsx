'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '../lib/utils';

import { ColLineIcon, SlideCircleIcon } from '../icons-generated';

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number[]) => void;
  ref?: React.Ref<HTMLDivElement>;
}

const Slider = ({
  className,
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  ref,
  ...props
}: SliderProps) => {
  const [minVal, maxVal] = value; // 부모로부터 전달받은 number[] range를 현재 slider의 양측을 담당함

  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);

  const valueToPercent = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max],
  );

  const minPercent = typeof minVal === 'number' ? valueToPercent(minVal) : 0;
  const maxPercent = typeof maxVal === 'number' ? valueToPercent(maxVal) : 0;

  const updateValue = useCallback(
    (clientX: number) => {
      if (typeof minVal !== 'number' || typeof maxVal !== 'number') {
        return;
      }

      if (dragging === null || !trackRef.current) return;

      const { left, width } = trackRef.current.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(100, ((clientX - left) / width) * 100),
      );

      let newValue = min + (percent / 100) * (max - min);

      newValue = Math.round(newValue / step) * step;

      if (dragging === 'min') {
        newValue = Math.min(newValue, maxVal);
        onValueChange([newValue, maxVal]);
      } else if (dragging === 'max') {
        newValue = Math.max(newValue, minVal);
        onValueChange([minVal, newValue]);
      }
    },
    [dragging, trackRef, step, min, max, minVal, maxVal, onValueChange],
  );

  const handleMouseDown = (e: React.MouseEvent, thumb: 'min' | 'max') => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(thumb);
  };
  const handleTouchStart = (e: React.TouchEvent, thumb: 'min' | 'max') => {
    e.stopPropagation();
    setDragging(thumb);
  };

  const handleTrackMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (
      !trackRef.current ||
      typeof minVal !== 'number' ||
      typeof maxVal !== 'number'
    )
      return;

    const { left, width } = trackRef.current.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(100, ((e.clientX - left) / width) * 100),
    );
    let newValue = min + (percent / 100) * (max - min);
    newValue = Math.round(newValue / step) * step;

    const distToMin = Math.abs(newValue - minVal);
    const distToMax = Math.abs(newValue - maxVal);

    if (distToMin < distToMax) {
      const finalMinVal = Math.min(newValue, maxVal);
      onValueChange([finalMinVal, maxVal]);
      setDragging('min');
    } else {
      const finalMaxVal = Math.max(newValue, minVal);
      onValueChange([minVal, finalMaxVal]);
      setDragging('max');
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setDragging(null);
    const handleTouchEnd = () => setDragging(null);

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging !== null) {
        e.preventDefault();
        updateValue(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (dragging !== null && e.touches[0]) {
        updateValue(e.touches[0].clientX);
      }
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragging, updateValue]);

  return (
    <div ref={ref} className={cn('w-full', 'pb-5', className)}>
      <div
        className='relative flex w-full touch-none select-none items-center'
        {...props}
      >
        <div
          ref={trackRef}
          className='relative h-1 w-full cursor-pointer overflow-hidden rounded-full bg-gray-200'
          onMouseDown={handleTrackMouseDown}
        >
          <div
            className='bg-primary-400 absolute h-full'
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>

        <SlideCircleIcon
          role='slider'
          aria-label='Minimum price'
          aria-valuemin={min}
          aria-valuemax={maxVal}
          aria-valuenow={minVal}
          data-slot='slider-thumb-min'
          className={cn(
            'focus-visible:outline-hidden',
            'absolute size-7 shrink-0 cursor-pointer border-gray-300 text-white',
            'transition-[color]',
          )}
          style={{
            left: `${minPercent}%`,
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
          onMouseDown={(e) => handleMouseDown(e, 'min')}
          onTouchStart={(e) => handleTouchStart(e, 'min')}
        />

        <SlideCircleIcon
          role='slider'
          aria-label='Maximum price'
          aria-valuemin={minVal}
          aria-valuemax={max}
          aria-valuenow={maxVal}
          data-slot='slider-thumb-max'
          className={cn(
            'focus-visible:outline-hidden',
            'absolute size-7 shrink-0 cursor-pointer border-gray-300 text-white',
            'transition-[color]',
          )}
          style={{
            left: `${maxPercent}%`,
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
          onMouseDown={(e) => handleMouseDown(e, 'max')}
          onTouchStart={(e) => handleTouchStart(e, 'max')}
        />
      </div>

      <div className='relative mt-4 w-full'>
        {sliderLabels.map((label) => (
          <div key={label.text} className={`absolute ${label.positionClass}`}>
            <SliderLabel text={label.text} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;

const sliderLabels = [
  { text: '최소', positionClass: '-left-3' },
  { text: '40만원', positionClass: 'left-[40%] -translate-x-1/2' },
  { text: '60만원', positionClass: 'left-[60%] -translate-x-1/2' },
  { text: '최대', positionClass: '-right-3' },
];

const SliderLabel = ({ text }: { text: string }) => (
  <div className='flex-center-col text-base-m-14-1 text-gray-600'>
    <ColLineIcon className='h-2' />
    <span>{text}</span>
  </div>
);
