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
  isMobile?: boolean;
}

export default function SingleImageSection({
  images,
  initialIndex,
  onIndexChange,
  isMobile = false,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
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
      <div className='flex-center-col relative min-h-0 w-full flex-1 gap-y-5 overflow-hidden'>
        {!isMobile && (
          <>
            <button
              onClick={scrollPrev}
              className={cn(
                'absolute left-0 z-20 cursor-pointer',
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
                'absolute right-0 z-20 cursor-pointer',
                'flex items-center justify-center rounded-full p-2',
                'transition-colors hover:bg-gray-100/50',
                'disabled:opacity-30',
              )}
              aria-label='Next slide'
            >
              <RightArrowIcon className='size-12 text-gray-700' />
            </button>
          </>
        )}

        <div
          className={cn(
            'overflow-hidden',
            isMobile ? 'h-[375px] w-full' : 'h-[698px] w-[698px]',
          )}
          ref={emblaRef}
        >
          <div className='flex h-full touch-pan-y'>
            {images.map((src, index) => (
              <div
                key={index}
                className={cn(
                  'relative',

                  isMobile
                    ? 'h-full w-full flex-[0_0_100%]'
                    : 'h-[698px] w-[698px] flex-[0_0_698px]',
                )}
              >
                <Image
                  src={src}
                  alt={`detail-view-${index}`}
                  fill
                  className='object-cover'
                  priority={index === initialIndex}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='flex-center text-base-m-14-1 gap-x-1 bg-white'>
          <span className='text-black'>{currentIndex + 1}</span>
          <span className='text-base-m-14-1 text-gray-400'>
            / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}
