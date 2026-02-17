'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Button, UserBaseInfoLabel } from '@muroom/components';
import { getFormattedDate } from '@muroom/util';

import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import { useStudioBoastsDetailQuery } from '@/hooks/api/studio-boasts/useQueries';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { LoginLink } from '@/hooks/auth/useAuthRedirect';

import BoastCommentList from '../components/boast-comment-list';
import BoastDetailImageCarousel from '../components/boast-image-carousel';
import BoastSimpleCarousel from '../components/boast-simple-carousel';
import BoastStudioCard from '../components/boast-studio-card';
import {
  StudioBoastsCommentButton,
  StudioBoastsLikeButton,
  StudioBoastsMoreButton,
  StudioBoastsShareButton,
} from '../components/buttons';
import ReportAlert from '../components/report-alert';

interface Props {
  targetedId: string;
}

export default function StudioBoastsDetailPage({ targetedId }: Props) {
  const [openReportAlert, setOpenReportAlert] = useState(false);

  const {
    data: studioBoastsDetailData,
    isLoading: isStudioBoastsDetailLoading,
  } = useStudioBoastsDetailQuery({ studioBoastId: targetedId });

  if (isStudioBoastsDetailLoading) {
    return <Loading />;
  }

  if (targetedId && !isStudioBoastsDetailLoading && !studioBoastsDetailData) {
    return <NotFound />;
  }

  const studioInfo = studioBoastsDetailData?.studioInfo;
  const unknownStudioInfo = studioBoastsDetailData?.unknownStudioInfo;

  const handleScrollToComments = () => {
    const element = document.getElementById('BOAST_COMMENT_SECTION');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const textarea = document.getElementById('COMMENT_CONTENT');
      textarea?.focus();
    }
  };

  return (
    <div className='gap-y-15 flex w-full flex-col'>
      <div className='gap-y-15 relative flex flex-col px-[calc(124px+56px)]'>
        <aside className='right-macro-48 top-67 absolute flex flex-col gap-y-6'>
          <StudioBoastsLikeButton
            studioBoastId={studioBoastsDetailData?.id || ''}
            likeCount={studioBoastsDetailData?.likeCount || 0}
            onLikeSelf={studioBoastsDetailData?.isLikedByRequestUser || false}
          />
          <StudioBoastsCommentButton
            commentCount={studioBoastsDetailData?.commentCount || 0}
            onClick={handleScrollToComments}
          />
          <StudioBoastsShareButton />
          <StudioBoastsMoreButton
            onSelf={studioBoastsDetailData?.isWrittenByRequestUser}
            studioBoastId={studioBoastsDetailData?.id || ''}
            instrumentDescription={
              studioBoastsDetailData?.creatorUserInfo.instrument || ''
            }
            nickname={studioBoastsDetailData?.creatorUserInfo.nickname || ''}
          />
        </aside>
        <BoastDetailImageCarousel
          images={studioBoastsDetailData?.imageFileUrls || []}
          initialIndex={0}
        />
        <p
          aria-label='detail-description'
          className='text-base-l-16-1 w-full whitespace-pre-wrap text-left'
        >
          {studioBoastsDetailData?.content}
        </p>
        <div className='flex flex-col gap-y-10'>
          <div className='flex flex-col gap-y-6'>
            <div className='flex-between text-base-s-12-1 text-gray-600'>
              <span>
                {getFormattedDate(
                  studioBoastsDetailData?.createdAt,
                  'yy.MM.dd HH:mm',
                )}
              </span>
              <ReportTextButton
                onSelf={studioBoastsDetailData?.isWrittenByRequestUser}
                onClick={() => setOpenReportAlert(true)}
              />
            </div>
            <UserBaseInfoLabel
              instrumentDescription={
                studioBoastsDetailData?.creatorUserInfo.instrument || ''
              }
              nickname={studioBoastsDetailData?.creatorUserInfo.nickname || ''}
            />
          </div>
          {studioInfo ? (
            <BoastStudioCard
              variant='known'
              id={studioInfo.id}
              title={studioInfo.name}
              minPrice={studioInfo.minPrice}
              maxPrice={studioInfo.maxPrice}
              thumbnailUrl={studioInfo.thumbnailImageFileUrl}
              subwayInfo={studioInfo.nearestSubwayStation}
            />
          ) : unknownStudioInfo ? (
            <BoastStudioCard
              variant='unknown'
              id='unknown'
              title={unknownStudioInfo.name}
              subwayInfo={unknownStudioInfo.nearestSubwayStation}
              address={`${unknownStudioInfo.roadNameAddress || unknownStudioInfo.lotNumberAddress || ''} ${unknownStudioInfo.detailedAddress || ''}`}
            />
          ) : null}
        </div>
        <div id='BOAST_COMMENT_SECTION'>
          <BoastCommentList studioBoastId={studioBoastsDetailData?.id || ''} />
        </div>
      </div>

      <div className='flex flex-col gap-y-10 px-[124px]'>
        <BoastSimpleCarousel sort='latest,desc' title='새로운 작업실 자랑' />
        <BoastSimpleCarousel
          sort='likes,desc'
          title='인기있는 작업실 자랑'
          headerRightSlot={
            <Link
              href='/studio-boasts'
              className='text-base-s-12-1 text-gray-600'
            >
              전체글 보기
            </Link>
          }
        />
      </div>

      <ReportAlert
        isOpen={openReportAlert}
        onClose={() => setOpenReportAlert(false)}
        studioBoastId={studioBoastsDetailData?.id || ''}
        instrumentDescription={
          studioBoastsDetailData?.creatorUserInfo.instrument || ''
        }
        nickname={studioBoastsDetailData?.creatorUserInfo.nickname || ''}
      />
    </div>
  );
}

const ReportTextButton = ({
  onSelf,
  onClick,
}: {
  onSelf?: boolean;
  onClick: () => void;
}) => {
  const { isLoggedIn } = useAuthCheck();

  if (onSelf) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <LoginLink>
        <Button variant='text'>신고하기</Button>
      </LoginLink>
    );
  }
  return (
    <Button variant='text' onClick={onClick}>
      신고하기
    </Button>
  );
};
