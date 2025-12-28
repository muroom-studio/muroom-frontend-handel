'use client';

import { useEffect, useState } from 'react';

import { Button, ModalBottomSheet, Spinner } from '@muroom/components';

import PageWrapper from '@/components/common/page-wrapper';

import CheckContent from '../contents/check-content';
import FormContent from '../contents/form-content';

interface MobileProps {
  isOpen: boolean;
  onClose: () => void;
  onFinalSubmit: () => void;
  isLoading: boolean;
  isValid: boolean;
  formProps: any;
}

export default function MobileReportAlert({
  isOpen,
  onClose,
  onFinalSubmit,
  isLoading,
  isValid,
  formProps,
}: MobileProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsConfirmOpen(false);
      setIsAgreed(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {!isConfirmOpen && (
        <PageWrapper
          isMobile
          isHeader={{ title: '신고하기', onBackClick: onClose }}
          className='fixed inset-0 z-[9999] bg-white'
          isModal
          bottomSlot={
            <div className='grid grid-cols-2 gap-x-3'>
              <Button variant='outline' size='xl' onClick={onClose}>
                취소하기
              </Button>
              <Button
                onClick={() => setIsConfirmOpen(true)}
                variant='danger'
                size='xl'
                disabled={!isValid}
              >
                신고하기
              </Button>
            </div>
          }
        >
          <FormContent {...formProps} />
        </PageWrapper>
      )}

      {/* 2단계: 확인 바텀시트 */}
      <ModalBottomSheet
        isOpen={isConfirmOpen}
        onClose={onClose}
        footerBtns={
          <div className='grid grid-cols-2 gap-x-3'>
            <Button variant='outline' size='xl' onClick={onClose}>
              취소하기
            </Button>
            <Button
              variant='danger'
              size='xl'
              disabled={!isAgreed}
              onClick={onFinalSubmit}
            >
              {isLoading ? <Spinner variant='component' /> : '신고하기'}
            </Button>
          </div>
        }
      >
        <div className='flex flex-col gap-y-5'>
          <p className='text-base-exl-18-2 text-red-600'>신고하기</p>
          <CheckContent
            isAgreed={isAgreed}
            onToggleAgree={() => setIsAgreed(!isAgreed)}
          />
        </div>
      </ModalBottomSheet>
    </>
  );
}
