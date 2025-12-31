'use client';

import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

import { Button, Modal, ModalBottomSheet } from '@muroom/components';
import EventLogo from '@muroom/ui/assets/event-logo.svg';

import CommonImage from '@/components/common/common-image';

import { useResponsiveLayout } from '../common/useResponsiveLayout';

const STORAGE_KEY = 'HIDE_EVENT_MODAL_UNTIL';

export const useEventModal = () => {
  const { isMobile } = useResponsiveLayout();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hideUntil = localStorage.getItem(STORAGE_KEY);

    if (!hideUntil || new Date() > new Date(hideUntil)) {
      setIsOpen(true);
    }
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const closeDontShowToday = useCallback(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    localStorage.setItem(STORAGE_KEY, tomorrow.toISOString());
    setIsOpen(false);
  }, []);

  const content = (
    <Link href='/studio-boasts' className='block w-full'>
      <CommonImage
        src={EventLogo}
        alt='이벤트 배너'
        width={420}
        height={384}
        className='h-auto w-full'
        priority={!isMobile}
      />
    </Link>
  );

  const footerButtons = (
    <div className='flex-between w-full'>
      <Button
        variant='text'
        size='xs'
        onClick={closeDontShowToday}
        className='w-fit'
      >
        오늘보지않기
      </Button>
      <Button variant='text' size='xs' onClick={close} className='w-fit'>
        닫기
      </Button>
    </div>
  );

  const modalElement = isMobile ? (
    <ModalBottomSheet
      isOpen={isOpen}
      onClose={close}
      bodyClassName='p-0'
      footerBtns={footerButtons}
    >
      {content}
    </ModalBottomSheet>
  ) : (
    <Modal isOpen={isOpen} onClose={close}>
      <Modal.Wrapper>
        <Modal.Header />
        <Modal.Body className='p-0'>{content}</Modal.Body>
        <Modal.Footer className='px-5'>{footerButtons}</Modal.Footer>
      </Modal.Wrapper>
    </Modal>
  );

  return {
    EventModal: modalElement,
    isOpen,
    close,
  };
};
