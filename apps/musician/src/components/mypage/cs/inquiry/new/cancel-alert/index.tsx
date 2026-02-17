'use cliet';

import { useRouter } from 'next/navigation';

import { Alert, Button, ModalBottomSheet } from '@muroom/components';

interface Props {
  isMobile?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function CancelAlert({
  isMobile = false,
  isOpen,
  onClose,
}: Props) {
  const router = useRouter();

  if (isMobile) {
    return (
      <ModalBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        footerBtns={
          <div className='grid grid-cols-2 gap-x-3'>
            <Button variant='outline' size='xl' onClick={onClose}>
              돌아가기
            </Button>
            <Button onClick={() => router.back()} variant='danger' size='xl'>
              1:1문의 취소하기
            </Button>
          </div>
        }
      >
        <div className='flex flex-col gap-y-5'>
          <h2 className='text-base-exl-18-2 text-red-500'>1:1문의 취소하기</h2>
          <p className='text-base-l-16-1'>
            1:1 문의를 취소합니다. 해당 내용은 임시저장 되지 않습니다.
          </p>
        </div>
      </ModalBottomSheet>
    );
  }

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => router.back()}
      variant='negative'
      title='1:1문의 취소하기'
      content='1:1 문의를 취소합니다. 해당 내용은, 임시저장 되지 않습니다.'
      cancelLabel='돌아가기'
      confirmLabel='1:1문의 취소하기'
    />
  );
}
