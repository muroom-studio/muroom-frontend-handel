import { useState } from 'react';

import { toast } from 'sonner';

import { Alert } from '@muroom/components';

import VerifyPhone from '@/components/welcome/components/steps/components/verify-phone';
import { useMusicianMeDetailMutation } from '@/hooks/api/musician/useMutations';

import ContentWrapper from '../components/content-wrapper';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhoneEditAlert({ isOpen, onClose }: Props) {
  const [verifiedPhone, setVerifiedPhone] = useState('');

  const { mutate: musicianMeDetailMutate } = useMusicianMeDetailMutation();

  const handleConfirm = () => {
    musicianMeDetailMutate(
      { phone: verifiedPhone },
      {
        onSuccess: () => {
          toast.success('전화번호가 성공적으로 변경되었습니다.');
          onClose();
        },
        onError: () => {
          toast.error('전화번호 변경이 실패했습니다.');
          setVerifiedPhone('');
        },
      },
    );
  };

  const AlertContent = () => {
    return (
      <ContentWrapper description='휴대폰 번호를 인증해주세요'>
        <VerifyPhone
          id='phoneNumber'
          name='phoneNumber'
          onVerified={setVerifiedPhone}
          onMyPage
        />
      </ContentWrapper>
    );
  };

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
