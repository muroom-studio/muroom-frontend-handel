'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { parseAsBoolean, useQueryState } from 'nuqs';

import { Alert, Header } from '@muroom/components';
import { CloseIcon } from '@muroom/icons';

import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';
import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';

interface Props {
  backClickHandler?: () => void;
}

const WelcomeHeader = ({ backClickHandler }: Props) => {
  const router = useRouter();
  const { performRedirect } = useAuthRedirectStore();
  const { isMobile } = useResponsiveLayout();

  const [showAlert, setShowAlert] = useState(false);

  const [isJoin, setJoin] = useQueryState(
    'join',
    parseAsBoolean.withDefault(false),
  );

  const handleDefaultBack = () => {
    if (isJoin) {
      setJoin(false);
      return;
    }

    router.back();
  };

  const onBackClick = backClickHandler || handleDefaultBack;

  const onCloseClick = () => {
    if (isJoin) {
      setShowAlert(true);
      return;
    }
    setJoin(false);
    router.back();
  };

  if (isMobile) {
    return <Header onBackClick={onBackClick} />;
  }

  return (
    <>
      <Header
        onBackClick={onBackClick}
        rightSlot={
          <CloseIcon className='size-6 cursor-pointer' onClick={onCloseClick} />
        }
      />
      <Alert
        variant='negative'
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        content={`회원가입을 취소합니다. \n현재까지 작성된 내용은 저장 되지 않습니다.`}
        title='회원가입 취소하기'
        cancelLabel='돌아가기'
        confirmLabel='회원가입 취소하기'
        onConfirm={performRedirect}
      />
    </>
  );
};

export default WelcomeHeader;
