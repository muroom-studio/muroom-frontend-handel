'use client';

import { useRouter } from 'next/navigation';

import { Alert, Button, ModalBottomSheet } from '@muroom/components';

interface Props {
  isMobile?: boolean;
  isOpen: boolean;
  onClose: () => void;
  mode?: 'create' | 'edit';
}

export default function CancelAlert({
  isMobile = false,
  isOpen,
  onClose,
  mode = 'create',
}: Props) {
  const router = useRouter();

  const isEditMode = mode === 'edit';

  const textConfig = {
    title: isEditMode ? '수정 취소하기' : '등록 취소하기',
    content: isEditMode
      ? '작업실 자랑하기 수정을 취소합니다. 수정된 내용은 저장되지 않습니다.'
      : '작업실 자랑하기 등록을 취소합니다. 해당 내용은 임시저장 되지 않습니다.',
    confirmLabel: isEditMode ? '수정 취소하기' : '등록 취소하기',
  };

  const handleConfirm = () => {
    router.back();
  };

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
            <Button onClick={handleConfirm} variant='danger' size='xl'>
              {textConfig.confirmLabel}
            </Button>
          </div>
        }
      >
        <div className='flex flex-col gap-y-5'>
          <h2 className='text-base-exl-18-2 text-red-500'>
            {textConfig.title}
          </h2>
          <p className='text-base-l-16-1'>{textConfig.content}</p>
        </div>
      </ModalBottomSheet>
    );
  }

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      variant='negative'
      title={textConfig.title}
      content={textConfig.content}
      cancelLabel='돌아가기'
      confirmLabel={textConfig.confirmLabel}
    />
  );
}
