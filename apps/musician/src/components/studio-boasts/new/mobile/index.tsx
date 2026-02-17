'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@muroom/components';

import PageWrapper from '@/components/common/page-wrapper';

import CancelAlert from '../../components/cancel-alert';

interface Props {
  submitHandler: () => void;
  isFormValid: boolean;
  children: React.ReactNode;
}

export default function MobileStudioBoastsNewPage({
  submitHandler,
  isFormValid,
  children,
}: Props) {
  const router = useRouter();

  const [showCancelAlert, setShowCancelAlert] = useState(false);

  return (
    <>
      <PageWrapper
        isMobile
        isHeader={{ title: '글쓰기', onBackClick: () => router.back() }}
        contentClassName='pt-6'
        bottomFixedSlot={
          <div className='grid grid-cols-2 gap-x-3'>
            <Button
              variant='outline'
              size='xl'
              onClick={() => setShowCancelAlert(true)}
            >
              취소하기
            </Button>
            <Button
              onClick={submitHandler}
              variant='primary'
              size='xl'
              disabled={!isFormValid}
            >
              등록하기
            </Button>
          </div>
        }
      >
        {children}
      </PageWrapper>
      <CancelAlert
        isMobile
        isOpen={showCancelAlert}
        onClose={() => setShowCancelAlert(false)}
      />
    </>
  );
}
