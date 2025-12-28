'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@muroom/components';

import PageWrapper from '@/components/common/page-wrapper';

import CancelAlert from '../../components/cancel-alert';
import { StudioBoastsLayoutProps } from '../../components/editor-form';

export default function MobileStudioBoastsEditPage({
  submitHandler,
  isFormValid,
  children,
  isLoading,
}: StudioBoastsLayoutProps) {
  const router = useRouter();
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  return (
    <>
      <PageWrapper
        isMobile
        isHeader={{ title: '수정하기', onBackClick: () => router.back() }}
        contentClassName='pt-6'
        bottomSlot={
          <div className='grid grid-cols-2 gap-x-3 border-t border-t-gray-200 p-5'>
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
              disabled={!isFormValid || isLoading}
            >
              수정완료
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
        mode='edit'
      />
    </>
  );
}
