'use client';

import { useCallback } from 'react';

import Image from 'next/image';

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import { DownArrowIcon } from '@muroom/icons';

import { useGalleryModal } from '../../components/gallery-modal';

interface Props {
  roomImgs: string[];
  controller: ReturnType<typeof useGalleryModal>;
}

export default function RoomImageGroup({ roomImgs, controller }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: true,
      containScroll: 'trimSnaps',
    },
    [WheelGesturesPlugin()],
  );

  const handleImageClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;

      const engine = emblaApi.internalEngine() as any;

      if (engine.dragHandler && !engine.dragHandler.clickAllowed()) return;

      controller.openSingle('room', index);
    },
    [emblaApi, controller],
  );

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex-between'>
        <span className='text-base-l-16-2'>사진</span>
        <DownArrowIcon
          className='size-6 -rotate-90 cursor-pointer'
          onClick={() => controller.openGroup()}
        />
      </div>

      <div
        ref={emblaRef}
        className='cursor-grab overflow-hidden active:cursor-grabbing'
      >
        <div className='flex touch-pan-y gap-x-1'>
          {roomImgs.map((room, index) => (
            <div
              key={index}
              className='relative h-[109px] w-[109px] flex-none cursor-pointer transition-opacity hover:opacity-90'
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={room}
                alt={`${room}이미지`}
                fill
                className='object-cover'
                sizes='109px'
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
