'use client';

import { useState } from 'react';

import { Button, Spinner } from '@muroom/components';

import PageWrapper from '@/components/common/page-wrapper';

import CancelAlert from '../../components/cancel-alert';
import { StudioBoastsLayoutProps } from '../../components/editor-form';

export default function DesktopStudioBoastsEditPage({
  submitHandler,
  isFormValid,
  children,
  isLoading,
}: StudioBoastsLayoutProps) {
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  return (
    <PageWrapper title='수정하기'>
      <div className='flex flex-col gap-y-10'>
        {children}
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
            {isLoading ? <Spinner variant='component' /> : '수정완료'}
          </Button>
        </div>
      </div>

      <CancelAlert
        isOpen={showCancelAlert}
        onClose={() => setShowCancelAlert(false)}
        mode='edit'
      />
    </PageWrapper>
  );
}
