'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { SearchIcon } from '@muroom/icons';
import BaseLogo from '@muroom/ui/assets/base-logo.svg';
import { Button, TextField } from '@muroom/ui/components';

import SearchBar from '@/components/common/search-bar';
import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';

export default function DesktopBaseHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setRedirectUrl } = useAuthRedirectStore();

  const handleLoginClick = () => {
    const queryString = searchParams.toString();
    const currentUrl = queryString ? `${pathname}?${queryString}` : pathname;

    setRedirectUrl(currentUrl);
  };

  return (
    <header className='flex-between border-b-[0.5px] border-b-gray-300 p-5'>
      <div className='flex-center gap-x-4'>
        <Link href={'/home'} className='cursor-pointer'>
          <Image src={BaseLogo} alt='로고' width={133} height={32} priority />
        </Link>
        <div className='w-[404px]'>
          <SearchBar />
        </div>
      </div>
      <Link
        href={`/welcome?${searchParams.toString()}`}
        scroll={false}
        onClick={handleLoginClick}
      >
        <Button variant='outline' size='l'>
          회원가입/로그인
        </Button>
      </Link>
    </header>
  );
}
