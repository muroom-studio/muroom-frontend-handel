'use client';

import { useState } from 'react';

import { Modal } from '@muroom/components';
import { DownArrowIcon } from '@muroom/icons';

export default function RoomImageGroup() {
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
        <div className='size-[109px] shrink-0 bg-yellow-200' />
        <div className='size-[109px] shrink-0 bg-blue-200' />
        <div className='size-[109px] shrink-0 bg-red-200' />
        <div className='size-[109px] shrink-0 bg-gray-200' />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Wrapper className='w-[1091px]'>
          <Modal.Header title='사진' />
          <Modal.Body>
            <p className='text-base-l-16-2 py-3 text-gray-900'>건물사진</p>
            <div className='grid grid-cols-3 gap-2'>
              <div className='size-[345px] bg-red-200' />
              <div className='size-[345px] bg-blue-200' />
              <div className='size-[345px] bg-orange-200' />
              <div className='bg-black-200 size-[345px]' />
              <div className='size-[345px] bg-yellow-200' />
              <div className='size-[345px] bg-gray-200' />
            </div>
          </Modal.Body>
        </Modal.Wrapper>
      </Modal>
    </div>
  );
}
