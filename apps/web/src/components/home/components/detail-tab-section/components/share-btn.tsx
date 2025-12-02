'use client';

import { toast } from 'sonner';

import { ShareIcon } from '@muroom/icons';

export default function ShareBtn() {
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);

    toast.success('링크가 복사되었습니다.');
  };

  return (
    <button type='button' onClick={handleCopy} className='cursor-pointer'>
      <ShareIcon className='size-6' />
    </button>
  );
}
