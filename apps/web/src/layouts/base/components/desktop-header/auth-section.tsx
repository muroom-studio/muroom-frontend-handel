'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Button, Tag } from '@muroom/components';

// 버튼 컴포넌트 경로에 맞게 수정해주세요
import { useMusicianMeQuery } from '@/hooks/api/musician/useQueries';
import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';

export default function AuthSection() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setRedirectUrl } = useAuthRedirectStore();

  const { data: musicianBaseData } = useMusicianMeQuery();

  const handleLoginClick = () => {
    const queryString = searchParams.toString();
    const currentUrl = queryString ? `${pathname}?${queryString}` : pathname;

    setRedirectUrl(currentUrl);
  };

  if (musicianBaseData) {
    return (
      <div className='flex items-center gap-2'>
        <Tag variant='musician'>{`${musicianBaseData.musicianInstrument.description}`}</Tag>
        <span className='text-base-l-16-2 text-black'>
          {musicianBaseData.nickname}
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/welcome?${searchParams.toString()}`}
      scroll={false}
      onClick={handleLoginClick}
    >
      <Button variant='outline' size='l'>
        회원가입/로그인
      </Button>
    </Link>
  );
}
