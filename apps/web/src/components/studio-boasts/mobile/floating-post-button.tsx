'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@muroom/components';
import { PlusIcon } from '@muroom/icons';

import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { LoginLink } from '@/hooks/auth/useAuthRedirect';

export default function FloatingPostButton() {
  const router = useRouter();
  const { isLoggedIn } = useAuthCheck();

  const handleWriteClick = () => {
    router.push('/studio-boasts/new');
  };

  const BaseButton = (
    <Button
      variant='primary'
      size='xl'
      className='shadow-level-2 absolute bottom-5 right-5 z-50'
      onClick={handleWriteClick}
    >
      <PlusIcon className='size-6 text-white' />
      글쓰기
    </Button>
  );

  if (!isLoggedIn) {
    return <LoginLink>{BaseButton}</LoginLink>;
  }

  return BaseButton;
}
