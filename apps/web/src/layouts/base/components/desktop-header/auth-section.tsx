'use client';

import { Button, Tag } from '@muroom/components';

import { useMusicianMeQuery } from '@/hooks/api/musician/useQueries';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { LoginLink } from '@/hooks/auth/useAuthRedirect';

export default function AuthSection() {
  const { isLoggedIn } = useAuthCheck();
  const { data: musicianBaseData } = useMusicianMeQuery();

  if (isLoggedIn) {
    return (
      <div className='flex items-center gap-2'>
        <Tag variant='musician'>{`${musicianBaseData?.musicianInstrument.description}`}</Tag>
        <span className='text-base-l-16-2 text-black'>
          {musicianBaseData?.nickname}
        </span>
      </div>
    );
  }

  return (
    <LoginLink>
      <Button variant='outline' size='l'>
        회원가입/로그인
      </Button>
    </LoginLink>
  );
}
