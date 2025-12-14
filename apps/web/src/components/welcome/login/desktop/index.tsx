'use client';

import Image from 'next/image';

import BaseLogo from '@muroom/ui/assets/base-logo.svg';

import { useWelcomeMode } from '@/hooks/nuqs/welcome/useWelcomeMode';

import WelcomeHeader from '../../components/header';
import SocialBtn, { SocialType } from '../../components/social-btn';

export default function DesktopLoginPage() {
  const { setJoin } = useWelcomeMode();

  return (
    <>
      <WelcomeHeader />
      <div className='pt-15 border-t-[0.5px] border-t-gray-300 px-10 pb-[42px]'>
        <div className='flex flex-col gap-y-2'>
          <Image src={BaseLogo} alt='로고' width={154} height={37} priority />
          <div className='flex items-center gap-x-2'>
            <span className='text-base-exl-18-1'>쉬운 음악 작업실 찾기!</span>
            <span className='text-base-exl-18-2'>뮤룸</span>
          </div>
        </div>
        <div className='h-29' />
        <div className='flex flex-col gap-y-3'>
          {/* {(['KAKAO', 'NAVER', 'GOOGLE'] as SocialType[]).map((social) => (
            <SocialBtn key={social} social={social} />
          ))} */}
          {(['KAKAO'] as SocialType[]).map((social) => (
            <SocialBtn key={social} social={social} />
          ))}
        </div>
        {/* <div className='h-6' /> */}
        {/* <div className='flex-center gap-x-2'>
          <span className='text-base-l-16-1'>사장님이시면</span>

          <span
            onClick={() => setJoin(true)}
            className='text-base-l-16-2 text-primary-600 cursor-pointer underline decoration-1 underline-offset-4'
          >
            뮤룸 파트너로 시작하기
          </span>
        </div> */}
      </div>
    </>
  );
}
