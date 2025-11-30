'use client';

import { useState } from 'react';

import { Snackbar } from '@muroom/components';
import { ShareIcon } from '@muroom/icons';

export default function ShareBtn() {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowSnackbar(true);
  };

  return (
    <div className='relative'>
      <button type='button' onClick={handleCopy} className='cursor-pointer'>
        <ShareIcon className='size-6' />
      </button>
      <Snackbar
        isOpen={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        label='링크가 복사되었습니다.'
      />
    </div>
  );
}
