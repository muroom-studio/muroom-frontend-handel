'use client';

import Link from 'next/link';

import { InstagramIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

interface Props {
  isMobile?: boolean;
}

export default function Footer({ isMobile = false }: Props) {
  return (
    <footer
      className={cn('w-full border-t border-t-gray-300 bg-white', {
        'border-t-0': isMobile,
      })}
    >
      {/* 1. 상단 링크 (약관/개인정보) */}
      {!isMobile && (
        <div className='flex items-center gap-x-10 px-20 py-5'>
          <Link href='/*' className='text-base-m-14-2'>
            서비스 이용약관
          </Link>
          <Link href='/*' className='text-base-m-14-2'>
            개인정보처리방침
          </Link>
        </div>
      )}
      {/* 2. 회사 정보 영역 */}
      <div
        className={cn('flex items-end justify-between px-20 py-5', {
          'p-5': isMobile,
        })}
      >
        <div>
          <span className='text-base-m-14-2 text-gray-500'>(주) 뮤룸</span>
          <div className='text-base-s-12-1 mb-5 mt-3 grid grid-cols-[max-content_1fr] gap-2 text-gray-500'>
            <span>대표이사</span>
            <span>김태환</span>

            <span>사업자 등록번호</span>
            <span>523-333-44424</span>

            <span>이메일</span>
            <span>support@muroom.im</span>
          </div>
          <span className='text-base-s-12-1 text-gray-500'>
            2025 Muroom inc. all rights reserved.
          </span>
        </div>
        <Link
          href='https://www.instagram.com/muroom_official/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <InstagramIcon className='size-6' />
        </Link>
      </div>
    </footer>
  );
}
