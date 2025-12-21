'use client';

import Link from 'next/link';

import { Tag } from '@muroom/components';
import { RightArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import Loading from '@/app/loading';
import PageWrapper from '@/components/common/page-wrapper';
import { useMusicianMeQuery } from '@/hooks/api/musician/useQueries';

export default function Page() {
  const { data: musicianBaseData, isLoading: isMusicianBaseLoading } =
    useMusicianMeQuery();

  if (isMusicianBaseLoading) {
    return <Loading />;
  }

  return (
    <PageWrapper isMobile isFooter>
      <ColItem
        nameSlot='내 프로필'
        sub={
          <div className='flex-between'>
            <div className='flex items-center gap-2'>
              <Tag variant='musician'>
                {musicianBaseData?.musicianInstrument.description}
              </Tag>
              <span className='text-base-l-16-2 text-black'>
                {musicianBaseData?.nickname}
              </span>
            </div>
            <Link href='/mypage/profile' className='cursor-pointer'>
              <RightArrowIcon className='size-6' />
            </Link>
          </div>
        }
      />
      <div className='h-2 bg-gray-200' />

      <ColItem nameSlot='비교함' className='border-b border-b-gray-200' />
      <ColItem
        nameSlot={
          <div className='flex items-center gap-x-2.5'>
            <span>작업실 자랑하기</span>
            <Tag variant='musician' className='bg-primary-50 !text-primary-500'>
              이벤트
            </Tag>
          </div>
        }
      />
      <div className='h-2 bg-gray-200' />

      <ColItem nameSlot='리뷰내역' className='border-b border-b-gray-200' />
      <ColItem nameSlot='고객센터' className='border-b border-b-gray-200' />
      <ColItem nameSlot='신고내역' />
      <div className='h-2 bg-gray-200' />

      <ColItem nameSlot='공지사항' className='border-b border-b-gray-200' />
      <ColItem
        nameSlot='서비스이용약관'
        className='border-b border-b-gray-200'
      />
      <ColItem
        nameSlot='개인정보처리방침'
        className='border-b border-b-gray-200'
      />
      <ColItem nameSlot='회사소개' />
    </PageWrapper>
  );
}

const ColItem = ({
  nameSlot,
  className,
  sub,
}: {
  nameSlot: React.ReactNode;
  className?: string;
  sub?: React.ReactNode;
}) => {
  return (
    <div className={cn('mx-5 flex flex-col gap-y-5 py-6', className)}>
      <div className='text-base-exl-18-2 text-gray-900'>{nameSlot}</div>
      {sub}
    </div>
  );
};
