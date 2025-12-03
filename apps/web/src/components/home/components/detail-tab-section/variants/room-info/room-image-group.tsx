'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Modal } from '@muroom/components';
import { DownArrowIcon } from '@muroom/icons';

interface Props {
  roomImgs: string[];
}

export default function RoomImageGroup({ roomImgs }: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex-between'>
        <span className='text-base-l-16-2'>사진</span>
        <DownArrowIcon
          className='size-6 -rotate-90 cursor-pointer'
          onClick={() => setShowModal(true)}
        />
      </div>

      <div className='flex overflow-x-auto [&::-webkit-scrollbar]:hidden'>
        {roomImgs.map((room) => (
          <Image
            key={room}
            src={room}
            alt={`${room}이미지`}
            width={109}
            height={109}
          />
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Wrapper className='w-[1091px]'>
          <Modal.Header title='사진' />
          <Modal.Body>
            <p className='text-base-l-16-2 py-3 text-gray-900'>건물사진</p>
            <div className='grid grid-cols-3 gap-2'>
              {roomImgs.map((room) => (
                <Image
                  key={room}
                  src={room}
                  alt={`${room}이미지`}
                  width={345}
                  height={345}
                  priority
                />
              ))}
            </div>
          </Modal.Body>
        </Modal.Wrapper>
      </Modal>
    </div>
  );
}
