import { useCallback, useEffect, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import { RightArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import CommonImage from '@/components/common/common-image';

interface Props {
  images: string[];
  initialIndex: number;
  onIndexChange?: (index: number) => void;
  isMobile?: boolean;
}

export default function BoastDetailImageCarousel({
  images,
  initialIndex,
  onIndexChange,
  isMobile = false,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    startIndex: initialIndex,
    duration: 20,
  });

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

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

      setPrevBtnDisabled(!api.canScrollPrev());
      setNextBtnDisabled(!api.canScrollNext());

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
      <div className='flex-center-col relative min-h-0 w-full flex-1 gap-y-4 overflow-hidden'>
        {/* 이미지 캐러셀 영역 */}
        <div className='relative w-full'>
          <div
            className={cn(
              'overflow-hidden',
              isMobile ? 'aspect-square w-full' : 'size-180',
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
                      : 'size-180 flex-[0_0_720px]',
                  )}
                >
                  <CommonImage
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

          {isMobile && (
            <div
              className='flex-center rounded-4 absolute bottom-5 right-5 z-50 gap-x-[2px] bg-white px-2 py-[5px]'
              style={{ transform: 'translateZ(0)' }}
            >
              <span className='text-base-m-14-2'>{currentIndex + 1}</span>
              <span className='text-base-m-14-1 text-gray-500'>/</span>
              <span className='text-base-m-14-1 text-gray-500'>
                {images.length}
              </span>
            </div>
          )}
        </div>

        {!isMobile && (
          <div className='flex-center gap-x-6 px-2 py-1'>
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className={cn(
                'flex-center cursor-pointer',
                'disabled:cursor-default disabled:text-gray-400',
              )}
              aria-label='Previous slide'
            >
              <RightArrowIcon
                className={cn(
                  'size-5 rotate-180',
                  prevBtnDisabled ? 'text-gray-400' : 'text-gray-700',
                )}
              />
            </button>

            <div className='flex-center text-base-m-14-1 gap-x-1 bg-white'>
              <span className='text-black'>{currentIndex + 1}</span>
              <span className='text-base-m-14-1 text-gray-400'>
                / {images.length}
              </span>
            </div>

            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className={cn(
                'flex-center cursor-pointer',
                'disabled:cursor-default disabled:text-gray-400',
              )}
              aria-label='Next slide'
            >
              <RightArrowIcon
                className={cn(
                  'size-5',
                  nextBtnDisabled ? 'text-gray-400' : 'text-gray-700',
                )}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
