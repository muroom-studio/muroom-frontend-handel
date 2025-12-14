'use client';

import Image from 'next/image';

import BaseLogo from '@muroom/ui/assets/base-logo.svg';

import { useWelcomeMode } from '@/hooks/nuqs/welcome/useWelcomeMode';

import WelcomeHeader from '../../components/header';
import SocialBtn, { SocialType } from '../../components/social-btn';

export default function MobileLoginPage() {
  const { setJoin } = useWelcomeMode();
  return (
    <div className='flex h-screen flex-col'>
      <WelcomeHeader />

      <div className='flex flex-1 flex-col justify-between px-4 pb-10'>
        <div className='flex-center-col mt-21 flex gap-y-2'>
          <Image src={BaseLogo} alt='로고' width={154} height={37} priority />
          <div className='flex items-center gap-x-2'>
            <span className='text-base-exl-18-1'>쉬운 음악 작업실 찾기!</span>
            <span className='text-base-exl-18-2'>뮤룸</span>
          </div>
        </div>

        <div className='flex-center-col gap-y-6'>
          <div className='flex w-full flex-col gap-y-3'>
            {(['KAKAO'] as SocialType[]).map((social) => (
              <SocialBtn key={social} social={social} />
            ))}
          </div>
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
      </div>
    </div>
  );
}
