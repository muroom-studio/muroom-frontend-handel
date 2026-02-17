'use client';

import { ShareIcon } from '@muroom/icons';

import { handleCopyClipboard } from '@/utils/handleCopyClipboard';

export default function ShareBtn() {
  return (
    <button
      type='button'
      onClick={handleCopyClipboard}
      className='cursor-pointer'
    >
      <ShareIcon className='size-6' />
    </button>
  );
}
