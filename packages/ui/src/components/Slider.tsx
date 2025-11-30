'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { ColLineIcon, SlideCircleIcon } from '../icons-generated';
import { cn } from '../lib/utils';

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
  const [minVal, maxVal] = value;
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
      if (typeof minVal !== 'number' || typeof maxVal !== 'number') return;
      if (dragging === null || !trackRef.current) return;

      const { left, width } = trackRef.current.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(100, ((clientX - left) / width) * 100),
      );

      let newValue = min + (percent / 100) * (max - min);
      newValue = Math.round(newValue / step) * step;

      if (dragging === 'min') {
        onValueChange([Math.min(newValue, maxVal), maxVal]);
      } else if (dragging === 'max') {
        onValueChange([minVal, Math.max(newValue, minVal)]);
      }
    },
    [dragging, min, max, minVal, maxVal, step, onValueChange],
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
    if (!trackRef.current) return;

    if (
      !trackRef.current ||
      typeof minVal !== 'number' ||
      typeof maxVal !== 'number'
    ) {
      return;
    }

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
      onValueChange([Math.min(newValue, maxVal), maxVal]);
      setDragging('min');
    } else {
      onValueChange([minVal, Math.max(newValue, minVal)]);
      setDragging('max');
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setDragging(null);
    const handleTouchEnd = () => setDragging(null);
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        e.preventDefault();
        updateValue(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (dragging && e.touches[0]) {
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
      {/* 1. 슬라이더 영역 (패딩 적용) */}
      <div className='px-3.5' {...props}>
        {/* ✨ 내부 relative 컨테이너: 여기가 0%~100%의 기준이 됩니다. */}
        <div className='relative flex h-7 w-full touch-none select-none items-center'>
          {/* 트랙 */}
          <div
            ref={trackRef}
            className='absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 cursor-pointer overflow-hidden rounded-full bg-gray-200'
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
            className='focus-visible:outline-hidden absolute z-10 size-7 cursor-pointer text-white'
            style={{
              left: `${minPercent}%`,
              transform: 'translateX(-50%)',
            }}
            onMouseDown={(e) => handleMouseDown(e, 'min')}
            onTouchStart={(e) => handleTouchStart(e, 'min')}
          />

          <SlideCircleIcon
            role='slider'
            className='focus-visible:outline-hidden absolute z-10 size-7 cursor-pointer text-white'
            style={{
              left: `${maxPercent}%`,
              transform: 'translateX(-50%)',
            }}
            onMouseDown={(e) => handleMouseDown(e, 'max')}
            onTouchStart={(e) => handleTouchStart(e, 'max')}
          />
        </div>
      </div>

      <div className='mt-4 px-3.5'>
        <div className='relative w-full'>
          {sliderLabels.map((label) => (
            <div
              key={label.text}
              className={`absolute whitespace-nowrap ${label.positionClass}`}
            >
              <SliderLabel text={label.text} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

const sliderLabels = [
  { text: '최소', positionClass: 'left-0 -translate-x-1/2' },
  { text: '40만원', positionClass: 'left-[40%] -translate-x-1/2' },
  { text: '60만원', positionClass: 'left-[60%] -translate-x-1/2' },
  { text: '최대', positionClass: 'left-[100%] -translate-x-1/2' },
];

const SliderLabel = ({ text }: { text: string }) => (
  <div className='flex-center-col text-base-m-14-1 text-gray-600'>
    <ColLineIcon className='h-2' />
    <span>{text}</span>
  </div>
);
