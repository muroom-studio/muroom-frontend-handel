'use client';

import Image from 'next/image';

import { DownArrowIcon } from '@muroom/icons';

// 위에서 만든 공통 컴포넌트 임포트 (경로를 맞춰주세요)
import DraggableCarousel from '@/components/common/draggable-carousel';

import { useGalleryModal } from '../../components/gallery-modal';

interface Props {
  roomImgs: string[];
  controller: ReturnType<typeof useGalleryModal>;
}

export default function RoomImageGroup({ roomImgs, controller }: Props) {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex-between'>
        <span className='text-base-l-16-2'>사진</span>
        <DownArrowIcon
          className='size-6 -rotate-90 cursor-pointer'
          onClick={() => controller.openGroup()}
        />
      </div>

      {/* gap-x-1은 containerClassName으로 전달 */}
      <DraggableCarousel containerClassName='gap-x-1'>
        {roomImgs.map((room, index) => (
          <div
            key={index}
            className='relative h-[109px] w-[109px] flex-none cursor-pointer transition-opacity hover:opacity-90'
            onClick={() => controller.openSingle('room', index)}
          >
            <Image
              src={room}
              alt={`${room}이미지`}
              fill
              className='object-cover'
              sizes='109px'
              draggable={false} // 이미지 자체 드래그 방지
            />
          </div>
        ))}
      </DraggableCarousel>
    </div>
  );
}
