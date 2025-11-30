'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SearchIcon } from '@muroom/icons';
import BaseLogo from '@muroom/ui/assets/base-logo.svg';
import { Button, TextField } from '@muroom/ui/components';

export default function DesktopBaseHeader() {
  const searchParams = useSearchParams();

  return (
    <header className='flex-between border-b-[0.5px] border-b-gray-300 p-5'>
      <div className='flex-center gap-x-4'>
        <Link href={'/home'} className='cursor-pointer'>
          <Image src={BaseLogo} alt='로고' width={133} height={32} priority />
        </Link>
        <div className='w-[404px]'>
          <TextField
            id='keyword'
            name='keyword'
            placeholder='지하철역 또는 작업실 검색하기'
            leftIcon={<SearchIcon className='size-6' />}
          />
        </div>
      </div>
      <Link href={`/welcome?${searchParams.toString()}`} scroll={false}>
        <Button variant='outline' size='l'>
          회원가입/로그인
        </Button>
      </Link>
    </header>
  );
}
