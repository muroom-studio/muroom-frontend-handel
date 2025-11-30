'use client';

import { useState } from 'react';

import { Button, Modal, ModalBottomSheet } from '@muroom/components';
import { cn } from '@muroom/lib';

import StaticMap from '@/components/common/static-map';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

interface Props {
  isMobile: boolean;
}

export default function ParkingBtn() {
  const { isMobile } = useResponsiveLayout();

  const [showParkingModal, setShowParkingModal] = useState(false);

  const conditionedModal = () => {
    if (isMobile) {
      return (
        <ModalBottomSheet
          isOpen={showParkingModal}
          onClose={() => setShowParkingModal(false)}
          footerBtns={
            <Button
              variant='outline'
              size='xl'
              className='w-full'
              onClick={() => setShowParkingModal(false)}
            >
              닫기
            </Button>
          }
        >
          <div>
            <span className='text-base-exl-18-2 text-black'>주차장 위치</span>
            <div className='pt-5'>{ModalContent({ isMobile })}</div>
          </div>
        </ModalBottomSheet>
      );
    }
    return (
      <Modal
        isOpen={showParkingModal}
        onClose={() => setShowParkingModal(false)}
      >
        <Modal.Wrapper className='px-0'>
          <Modal.Header title='주차장 위치' className='border-b-0 px-5' />
          <Modal.Body className='border-t border-t-gray-200 pt-0'>
            {ModalContent({ isMobile })}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='outline'
              size='xl'
              onClick={() => setShowParkingModal(false)}
            >
              확인
            </Button>
          </Modal.Footer>
        </Modal.Wrapper>
      </Modal>
    );
  };

  return (
    <>
      <Button
        variant='outline'
        size='s'
        onClick={() => setShowParkingModal(true)}
      >
        위치
      </Button>
      {conditionedModal()}
    </>
  );
}

const ModalContent = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className='flex flex-col pb-5'>
      <StaticMap
        centerLat={37.3595704}
        centerLng={127.105399}
        height={195}
        targetedCenter='parking'
      />
      <div
        className={cn('flex flex-col gap-y-1 border-t border-t-gray-200 pt-5', {
          'px-5': !isMobile,
        })}
      >
        <p className='text-base-l-16-2'>잠원수영장옆공영주차장</p>
        <p className='text-base-l-16-1'>서울 서초구 잠원동 86</p>
      </div>
    </div>
  );
};
