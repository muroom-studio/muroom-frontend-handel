'use client';

import { useRouter } from 'next/navigation';

import { Button, Tag, UserBaseInfoLabel } from '@muroom/components';
import { RightArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import Loading from '@/app/loading';
import PageWrapper from '@/components/common/page-wrapper';
import { useMusicianMeQuery } from '@/hooks/api/musician/useQueries';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { LoginLink } from '@/hooks/auth/useAuthRedirect';
import { usePrepareModal } from '@/hooks/usePrepareModal.tsx';

export default function Page() {
  const { isLoggedIn } = useAuthCheck();

  const router = useRouter();

  const { data: musicianBaseData, isLoading: isMusicianBaseLoading } =
    useMusicianMeQuery();

  if (isMusicianBaseLoading) {
    return <Loading />;
  }

  return (
    <PageWrapper
      isMobile
      isHeader={{ title: '더보기', onBackClick: () => router.back() }}
      contentClassName='px-0 pt-0'
      isFooter
      footerClassName='pb-[64px]'
    >
      {isLoggedIn ? (
        <ColItem
          nameSlot='내 프로필'
          sub={
            <div className='flex-between'>
              <UserBaseInfoLabel
                instrumentDescription={
                  musicianBaseData?.musicianInstrument.description || ''
                }
                nickname={musicianBaseData?.nickname || ''}
              />
              <RightArrowIcon className='size-6 cursor-pointer' />
            </div>
          }
          url='/mypage/profile'
        />
      ) : (
        <div className='px-5 py-6'>
          <LoginLink>
            <Button variant='primary' size='xl' className='w-full'>
              회원가입 / 로그인
            </Button>
          </LoginLink>
        </div>
      )}

      <div className='h-2 bg-gray-200' />

      {/* {isLoggedIn && (
        <ColItem nameSlot='비교함' className='border-b border-b-gray-200' />
      )} */}
      <ColItem
        nameSlot={
          <div className='flex items-center gap-x-2.5'>
            <span>작업실 자랑하기</span>
            <Tag variant='musician' className='bg-primary-50 !text-primary-500'>
              이벤트
            </Tag>
          </div>
        }
        url='/studio-boasts'
      />

      <div className='h-2 bg-gray-200' />
      {/* <ColItem nameSlot='리뷰내역' className='border-b border-b-gray-200' /> */}
      <ColItem
        nameSlot={isLoggedIn ? '고객센터' : 'FAQ'}
        className='border-b border-b-gray-200'
        url='/mypage/cs'
      />
      {/* <ColItem nameSlot='신고내역' /> */}
      <div className='h-2 bg-gray-200' />

      {/* <ColItem nameSlot='공지사항' className='border-b border-b-gray-200' /> */}
      <ColItem
        nameSlot='서비스이용약관'
        className='border-b border-b-gray-200'
      />
      <ColItem
        nameSlot='개인정보처리방침'
        className='border-b border-b-gray-200'
      />
      {/* <ColItem nameSlot='회사소개' /> */}
    </PageWrapper>
  );
}

const ColItem = ({
  nameSlot,
  className,
  sub,
  url,
}: {
  nameSlot: React.ReactNode;
  className?: string;
  sub?: React.ReactNode;
  url?: string;
}) => {
  const router = useRouter();

  const { open, PrepareModal } = usePrepareModal();

  const handleClick = () => {
    if (url) {
      router.push(url);
    } else {
      open();
    }
  };

  return (
    <>
      <div
        className={cn(
          'mx-5 flex cursor-pointer flex-col gap-y-5 py-6',
          className,
        )}
        onClick={handleClick}
      >
        <div className='text-base-exl-18-2 text-gray-900'>{nameSlot}</div>
        {sub}
      </div>
      {PrepareModal}
    </>
  );
};
