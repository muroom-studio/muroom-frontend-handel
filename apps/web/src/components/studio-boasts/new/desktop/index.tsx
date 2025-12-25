'use client';

import { useState } from 'react';

import { Button } from '@muroom/components';

import PageWrapper from '@/components/common/page-wrapper';

import CancelAlert from '../cancel-alert';

interface Props {
  submitHandler: () => void;
  isFormValid: boolean;
  children: React.ReactNode;
}

export default function DesktopStudioBoastsNewPage({
  submitHandler,
  isFormValid,
  children,
}: Props) {
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  return (
    <PageWrapper title='글쓰기'>
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
            disabled={!isFormValid}
          >
            문의하기
          </Button>
        </div>
      </div>

      <CancelAlert
        isOpen={showCancelAlert}
        onClose={() => setShowCancelAlert(false)}
      />
    </PageWrapper>
  );
}
