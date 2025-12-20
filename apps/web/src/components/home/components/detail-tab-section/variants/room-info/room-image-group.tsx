'use client';

import { useCallback, useEffect, useRef } from 'react';

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

  const isScroll = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      isScroll.current = true; // 스크롤(드래그) 발생 시 true
    };

    const onPointerDown = () => {
      isScroll.current = false; // 마우스를 누르는 순간 false로 초기화
    };

    emblaApi.on('scroll', onScroll);
    emblaApi.on('pointerDown', onPointerDown);

    return () => {
      emblaApi.off('scroll', onScroll);
      emblaApi.off('pointerDown', onPointerDown);
    };
  }, [emblaApi]);

  const handleImageClick = useCallback(
    (index: number) => {
      // [수정 3] 에러가 나는 내부 엔진 코드 제거 및 Ref 상태 확인
      // 드래그(스크롤) 중이었다면 클릭 무시
      if (isScroll.current) return;

      controller.openSingle('room', index);
    },
    [controller], // emblaApi 의존성 제거 가능 (Ref 사용하므로)
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
