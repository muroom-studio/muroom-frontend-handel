'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Modal } from '@muroom/components';
import { DownArrowIcon } from '@muroom/icons';

import { useGalleryModal } from '../../components/gallery-modal';

interface Props {
  roomImgs: string[];
  controller: ReturnType<typeof useGalleryModal>;
}

export default function RoomImageGroup({ roomImgs, controller }: Props) {
  // const [showModal, setShowModal] = useState(false);
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex-between'>
        <span className='text-base-l-16-2'>사진</span>
        <DownArrowIcon
          className='size-6 -rotate-90 cursor-pointer'
          onClick={() => controller.openGroup()}
        />
      </div>

      <div className='flex items-center gap-x-1 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
        {roomImgs.map((room, index) => (
          <div
            key={index}
            className='relative h-[109px] w-[109px] shrink-0 cursor-pointer transition-opacity hover:opacity-90'
            onClick={() => controller.openSingle('room', index)}
          >
            <Image
              src={room}
              alt={`${room}이미지`}
              fill
              className='object-cover'
              sizes='109px'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
