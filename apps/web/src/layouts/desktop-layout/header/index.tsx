import Image from 'next/image';

import BaseLogo from '@muroom/ui/assets/base-logo.svg';

import { Button, TextField } from '@muroom/ui/components';

import { SearchIcon } from '@muroom/icons';

export default function DesktopHeader() {
  return (
    <header className='flex-between border-b-[0.5px] border-b-gray-300 p-5'>
      <div className='flex-center gap-x-4'>
        <Image src={BaseLogo} alt='로고' width={133} height={32} priority />
        <div className='w-[404px]'>
          <TextField
            id='keyword'
            name='keyword'
            placeholder='지하철역 또는 작업실 검색하기'
            leftIcon={<SearchIcon className='size-6' />}
          />
        </div>
      </div>
      <Button variant='outline' size='l'>
        회원가입/로그인
      </Button>
    </header>
  );
}
