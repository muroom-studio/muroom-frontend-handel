'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import useEmblaCarousel from 'embla-carousel-react';

import { RightArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

interface Props {
  images: string[];
  initialIndex: number;
  onIndexChange?: (index: number) => void;
}

export default function SingleImageSection({
  images,
  initialIndex,
  onIndexChange,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialIndex,
    duration: 20,
  });

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(
    (api: any) => {
      const idx = api.selectedScrollSnap();
      setCurrentIndex(idx);

      if (onIndexChange) {
        onIndexChange(idx);
      }
    },
    [onIndexChange],
  );

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className='relative flex h-full w-full flex-col'>
      {/* [1] 상단 영역 Wrapper (화살표 + 슬라이더) 
        - flex-1: 남은 높이를 모두 차지
        - min-h-0: flex 자식의 overflow 처리를 위해 필수
      */}
      <div className='relative flex min-h-0 w-full flex-1 flex-col justify-center'>
        {/* [2] Navigation Arrows (슬라이더 영역 밖에 배치됨) */}
        <button
          onClick={scrollPrev}
          className={cn(
            'absolute left-4 z-10', // 위치 고정
            'flex items-center justify-center rounded-full p-2',
            'transition-colors hover:bg-gray-100/50',
            'disabled:opacity-30',
          )}
          aria-label='Previous slide'
        >
          <RightArrowIcon className='size-12 rotate-180 text-gray-700' />
        </button>

        <button
          onClick={scrollNext}
          className={cn(
            'absolute right-4 z-10', // 위치 고정
            'flex items-center justify-center rounded-full p-2',
            'transition-colors hover:bg-gray-100/50',
            'disabled:opacity-30',
          )}
          aria-label='Next slide'
        >
          <RightArrowIcon className='size-12 text-gray-700' />
        </button>

        {/* [3] Carousel Viewport (emblaRef)
          - mx-20 (80px): 양옆에 물리적인 여백을 줍니다. 
          - overflow-hidden: 이 마진 경계 밖의 모든 것(옆 사진 포함)을 잘라냅니다.
          - h-full: 부모 높이를 꽉 채움
        */}
        <div className='mx-20 h-full overflow-hidden' ref={emblaRef}>
          <div className='flex h-full touch-pan-y'>
            {images.map((src, index) => (
              <div
                key={index}
                // flex-[0_0_100%]: 슬라이드 하나가 뷰포트(마진 제외 영역)를 100% 채움
                className='relative h-full min-w-0 flex-[0_0_100%]'
              >
                <Image
                  src={src}
                  alt={`detail-view-${index}`}
                  fill
                  className='object-contain'
                  priority={index === initialIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Bottom Controller --- */}
      <div className='flex items-center justify-center gap-x-4 border-t border-gray-100 bg-white py-6'>
        <span className='text-base-m-14-1 text-gray-900'>
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
