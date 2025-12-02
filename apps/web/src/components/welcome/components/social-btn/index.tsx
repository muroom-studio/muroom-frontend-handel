'use client';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@muroom/lib';
import GoogleLogo from '@muroom/ui/assets/google-logo.svg';
import KakaoLogo from '@muroom/ui/assets/kakao-logo.svg';
import NaverLogo from '@muroom/ui/assets/naver-logo.svg';

import {
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  NAVER_CLIENT_ID,
  NAVER_REDIRECT_URI,
  NAVER_SECRET_KEY,
} from '@/config/constants';

export type SocialType = 'KAKAO' | 'NAVER' | 'GOOGLE';

const SOCIAL_CONFIG = {
  KAKAO: {
    Icon: KakaoLogo,
    label: '카카오로 시작하기',
    url: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`,
  },
  NAVER: {
    Icon: NaverLogo,
    label: '네이버로 시작하기',
    url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SECRET_KEY}&redirect_uri=${NAVER_REDIRECT_URI}`,
  },
  GOOGLE: {
    Icon: GoogleLogo,
    label: '구글로 시작하기',
    url: `http://dev-api.muroom.kr/oauth2/authorization/google`,
  },
};

const SocialBtn = ({ social }: { social: SocialType }) => {
  const { Icon, label, url } = SOCIAL_CONFIG[social];

  return (
    <Link href={url} replace={true}>
      <button
        type='button'
        className={cn(
          'text-base-l-16-2 rounded-4 h-13 inline-flex w-full cursor-pointer items-center justify-center py-4 transition-opacity hover:opacity-90',
          {
            'bg-[#FEE500] text-black': social === 'KAKAO',
            'bg-[#03CF5A] text-white': social === 'NAVER',
            'border border-gray-300 bg-white text-black': social === 'GOOGLE',
          },
        )}
      >
        <div className='flex items-center gap-x-2'>
          <Image src={Icon} alt={`${social} logo`} width={20} height={20} />
          <span>{label}</span>
        </div>
      </button>
    </Link>
  );
};

export default SocialBtn;
