import { useState } from 'react';

import { toast } from 'sonner';

import { Alert, Button, ModalBottomSheet } from '@muroom/components';

import VerifyPhone from '@/components/welcome/components/steps/components/verify-phone';
import { useMusiciansMeDetailMutation } from '@/hooks/api/musicians/useMutations';

import ContentWrapper from '../components/content-wrapper';

interface Props {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function PhoneEditAlert({ isMobile, isOpen, onClose }: Props) {
  const [verifiedPhone, setVerifiedPhone] = useState('');

  const { mutate: musicianMeDetailMutate } = useMusiciansMeDetailMutation();

  const handleConfirm = () => {
    musicianMeDetailMutate(
      { phone: verifiedPhone },
      {
        onSuccess: () => {
          toast.success('전화번호가 변경되었습니다.');
          onClose();
        },
        onError: () => {
          setVerifiedPhone('');
        },
      },
    );
  };

  const AlertContent = () => {
    return (
      <ContentWrapper
        isMobile
        title={isMobile ? '휴대폰 번호 변경' : ''}
        description='휴대폰 번호를 인증해주세요'
      >
        <VerifyPhone
          id='phoneNumber'
          name='phoneNumber'
          onVerified={setVerifiedPhone}
          onMyPage
        />
      </ContentWrapper>
    );
  };

  if (isMobile) {
    return (
      <ModalBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        footerBtns={
          <div className='grid grid-cols-2 gap-x-3'>
            <Button variant='outline' size='xl' onClick={onClose}>
              취소하기
            </Button>
            <Button
              onClick={handleConfirm}
              variant='primary'
              size='xl'
              disabled={!verifiedPhone}
            >
              변경하기
            </Button>
          </div>
        }
      >
        {AlertContent()}
      </ModalBottomSheet>
    );
  }

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title='휴대폰 번호 변경'
      content={AlertContent()}
      confirmLabel='변경하기'
      confirmDisabled={!verifiedPhone}
    />
  );
}
