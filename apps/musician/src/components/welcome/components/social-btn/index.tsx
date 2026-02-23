'use client';

import Link from 'next/link';

import { Tooltip, TooltipContent, TooltipTrigger } from '@muroom/components';
import { cn } from '@muroom/lib';
import GoogleLogo from '@muroom/ui/assets/google-logo.svg';
import KakaoLogo from '@muroom/ui/assets/kakao-logo.svg';

import CommonImage from '@/components/common/common-image';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
} from '@/config/constants';
import { LAST_LOGIN_PROVIDER } from '@/config/storage-key';

export type SocialType = 'KAKAO' | 'GOOGLE';

const SOCIAL_CONFIG = {
  KAKAO: {
    Icon: KakaoLogo,
    provider: 'KAKAO',
    label: '카카오로 시작하기',
    url: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`,
  },
  // NAVER: {
  //   Icon: NaverLogo,
  //   label: '네이버로 시작하기',
  //   url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SECRET_KEY}&redirect_uri=${NAVER_REDIRECT_URI}`,
  // },
  GOOGLE: {
    Icon: GoogleLogo,
    provider: 'GOOGLE',
    label: '구글로 시작하기',
    url: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`,
  },
};

const SocialBtn = ({ social }: { social: SocialType }) => {
  const { Icon, provider, label, url } = SOCIAL_CONFIG[social];

  const isRecent = localStorage.getItem(LAST_LOGIN_PROVIDER) === provider;

  return (
    <Link href={url} replace={true}>
      <Tooltip
        open={isRecent}
        delayDuration={Infinity}
        side='right'
        sideOffset={-80}
      >
        <TooltipTrigger asChild>
          <button
            type='button'
            className={cn(
              'text-base-l-16-2 rounded-4 h-13 inline-flex w-full cursor-pointer items-center justify-center py-4 transition-opacity hover:opacity-90',
              {
                'bg-[#FEE500] text-black': social === 'KAKAO',
                // 'bg-[#03CF5A] text-white': social === 'NAVER',
                'border border-gray-300 bg-white text-black':
                  social === 'GOOGLE',
              },
            )}
          >
            <div className='flex items-center gap-x-2'>
              <CommonImage
                src={Icon}
                alt={`${social} logo`}
                width={20}
                height={20}
              />
              <span>{label}</span>
            </div>
          </button>
        </TooltipTrigger>

        {isRecent && <TooltipContent>최근 로그인</TooltipContent>}
      </Tooltip>
    </Link>
  );
};

export default SocialBtn;
