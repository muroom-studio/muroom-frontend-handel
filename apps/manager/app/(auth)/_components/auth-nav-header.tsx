'use client';

import { useRouter } from 'next/navigation';

import { CloseIcon, LeftarrowIcon } from '@muroom/ui/icons';

export function AuthNavHeader() {
  const router = useRouter();

  return (
    <div className='border-0.5 flex items-center justify-between border-b px-5 py-4'>
      <button
        type='button'
        onClick={() => router.back()}
        aria-label='뒤로가기'
        className='flex size-6 items-center justify-center text-gray-800'
      >
        <LeftarrowIcon className='size-full' />
      </button>
      <button
        type='button'
        onClick={() => router.push('/')}
        aria-label='닫기'
        className='flex size-6 items-center justify-center text-gray-800'
      >
        <CloseIcon className='size-full' />
      </button>
    </div>
  );
}
