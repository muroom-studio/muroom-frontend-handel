'use client';

import Image from 'next/image';
import Link from 'next/link';

import BaseLogo from '@muroom/ui/assets/base-logo.svg';
import { Button, TextField } from '@muroom/ui/components';

export default function SignUpForm() {
  return (
    <div className='desktop:items-center desktop:justify-center flex flex-1 flex-col'>
      <div className='desktop:pt-15 desktop:shadow-level-0 desktop:max-w-[428px] desktop:flex-none desktop:rounded-sm desktop:border desktop:border-gray-300 desktop:px-10 desktop:pb-10 flex w-full flex-1 flex-col px-5 pb-10'>
        {/* 로고 */}
        <div className='desktop:mb-10 desktop:flex-none flex flex-1 flex-col items-center justify-center gap-0.5'>
          <Image
            src={BaseLogo}
            alt='로고'
            width={133}
            height={32}
            priority
            className='brightness-0'
          />
          <span className='text-[22px] font-semibold'>파트너스</span>
        </div>

        {/* 폼 */}
        <div className='flex flex-col gap-6'>
          <TextField
            label='이메일'
            placeholder='이메일을 입력해주세요'
            type='email'
            required={false}
          />
          <TextField
            label='비밀번호'
            placeholder='비밀번호를 입력해주세요'
            type='password'
            required={false}
          />
        </div>

        {/* 로그인 버튼 */}
        <Button className='mt-10 w-full' size='xl'>
          로그인
        </Button>

        {/* 하단 링크 */}
        <div className='mt-8 flex items-center justify-center gap-4'>
          <Link
            href='/auth/forgot-password'
            className='text-base-m-14-1 text-gray-500'
          >
            비밀번호 찾기
          </Link>
          <div className='h-3 w-px bg-gray-300' />
          <Link href='/auth/sign-up' className='text-base-m-14-1 text-gray-500'>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
