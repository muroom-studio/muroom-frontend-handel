'use client';

import { useState } from 'react';

import { Alert, Button, Checkbox, ModalBottomSheet } from '@muroom/components';
import { RightArrowIcon } from '@muroom/icons';
import { updateObjectProperty } from '@muroom/util';

import DetailInstaAgreement from './detail';

interface AgreementState {
  agreedToEventTerms: boolean;
}

interface Props<T extends AgreementState> {
  isMobile?: boolean;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  showConfirmCheckModal: boolean;
  setShowConfirmCheckModal: React.Dispatch<React.SetStateAction<boolean>>;
  onRegister?: () => void;
}

export default function InstaAgreement<T extends AgreementState>({
  isMobile = false,
  value,
  setValue,
  showConfirmCheckModal,
  setShowConfirmCheckModal,
  onRegister,
}: Props<T>) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const isModalOpen = showConfirmCheckModal || showDetailModal;
  const isRegisterMode = showConfirmCheckModal;

  const handleClose = () => {
    setShowDetailModal(false);
    setShowConfirmCheckModal(false);
  };

  const handleConfirm = () => {
    setValue((prev) => updateObjectProperty(prev, 'agreedToEventTerms', true));

    if (isRegisterMode) {
      onRegister?.();
    }
    handleClose();
  };

  const confirmLabel = isRegisterMode ? '동의하고 등록하기' : '동의하기';

  const toggleAgreement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setValue((prev) =>
      updateObjectProperty(
        prev,
        'agreedToEventTerms',
        !prev.agreedToEventTerms,
      ),
    );
  };

  return (
    <div className='flex flex-col gap-y-3'>
      <span className='text-title-exs-18'>
        개인정보 및 정보 수집에 동의해주세요
      </span>
      <div className='flex-between'>
        <div
          onClick={toggleAgreement}
          className='flex cursor-pointer items-center'
        >
          <Checkbox
            checked={value.agreedToEventTerms}
            onChange={() => {}}
            className='pointer-events-none w-fit'
            label={
              <span className='text-base-exl-18-1 flex items-center'>
                <span className='text-primary-400 mr-1'>필수</span>
                <span className='text-gray-600'>개인정보 수집 및 이용동의</span>
              </span>
            }
          />
        </div>

        <button
          type='button'
          className='cursor-pointer'
          onClick={() => setShowDetailModal(true)}
        >
          <RightArrowIcon className='size-6 text-gray-400' />
        </button>
      </div>

      {isMobile ? (
        <ModalBottomSheet
          isOpen={isModalOpen}
          onClose={handleClose}
          footerBtns={
            <div className='grid grid-cols-2 gap-x-3'>
              <Button variant='outline' size='xl' onClick={handleClose}>
                닫기
              </Button>
              <Button onClick={handleConfirm} variant='primary' size='xl'>
                {confirmLabel}
              </Button>
            </div>
          }
        >
          <DetailInstaAgreement isMobile={isMobile} />
        </ModalBottomSheet>
      ) : (
        <Alert
          isOpen={isModalOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title='[필수] 개인정보 수집 및 이용동의'
          content={<DetailInstaAgreement />}
          cancelLabel='닫기'
          confirmLabel={confirmLabel}
        />
      )}
    </div>
  );
}
