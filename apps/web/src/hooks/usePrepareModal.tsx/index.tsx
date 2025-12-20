'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';

import { Button, Modal, ModalBottomSheet } from '@muroom/components';
import { cn } from '@muroom/lib';
import PrepareImage from '@muroom/ui/assets/prepare-modal.svg';

import { useResponsiveLayout } from '../useResponsiveLayout';

export const usePrepareModal = () => {
  const { isMobile } = useResponsiveLayout();
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const PrepareModal = useCallback(() => {
    const content = (
      <div className='flex flex-col'>
        <div className='flex-center mb-6'>
          <Image
            src={PrepareImage}
            alt='준비로고'
            width={64}
            height={64}
            priority
          />
        </div>

        <h2 className='text-title-s-22-2 mb-5'>
          해당 페이지는 아직 준비중이예요
        </h2>

        <p className='text-base-l-16-1 break-keep'>
          보다 편리한 서비스를 제공해 드리기 위해 해당 페이지는 준비 중입니다.
          빠른시일내에 업데이트 하도록 하겠습니다.
        </p>
      </div>
    );

    const confirmButton = (
      <Button
        variant='outline'
        size='xl'
        onClick={close}
        className={cn(isMobile && 'w-full')}
      >
        확인
      </Button>
    );

    if (isMobile) {
      return (
        <ModalBottomSheet
          isOpen={isOpen}
          onClose={close}
          footerBtns={confirmButton}
        >
          {content}
        </ModalBottomSheet>
      );
    }

    return (
      <Modal isOpen={isOpen} onClose={close}>
        <Modal.Wrapper>
          <Modal.Header />
          <Modal.Body>{content}</Modal.Body>
          <Modal.Footer>{confirmButton}</Modal.Footer>
        </Modal.Wrapper>
      </Modal>
    );
  }, [isOpen, close, isMobile]);

  return {
    open,
    close,
    Modal: PrepareModal,
    isOpen,
  };
};
