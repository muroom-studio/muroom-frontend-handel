'use client';

import Image from 'next/image';
import Link from 'next/link';

import BaseLogo from '@muroom/ui/assets/base-logo.svg';
import { Button, TextField } from '@muroom/ui/components';

export default function SignUpForm() {
  return (
    <div className='flex flex-1 flex-col md:items-center md:justify-center'>
      <div className='md:pt-15 md:shadow-level-0 flex w-full flex-1 flex-col px-5 pb-10 md:max-w-[428px] md:flex-none md:rounded-sm md:border md:border-gray-300 md:px-10 md:pb-10'>
        {/* 로고 */}
        <div className='flex flex-1 flex-col items-center justify-center gap-0.5 md:mb-10 md:flex-none'>
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
