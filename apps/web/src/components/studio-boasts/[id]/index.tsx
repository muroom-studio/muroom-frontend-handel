'use client';

import { useRouter } from 'next/navigation';

import { Button, UserBaseInfoLabel } from '@muroom/components';
import { getFormattedDate } from '@muroom/util';

import Loading from '@/app/loading';
import { useStudioBoastsDetailQuery } from '@/hooks/api/studio-boasts/useQueries';

import BoastDetailImageCarousel from '../components/boast-image-carousel';
import BoastStudioCard from '../components/boast-studio-card';
import {
  StudioBoastsCommentButton,
  StudioBoastsLikeButton,
  StudioBoastsMoreButton,
  StudioBoastsShareButton,
} from '../components/buttons';

interface Props {
  targetedId: string;
}

export default function StudioBoastsDetailPage({ targetedId }: Props) {
  const router = useRouter();
  const {
    data: studioBoastsDetailData,
    isLoading: isStudioBoastsDetailLoading,
  } = useStudioBoastsDetailQuery({ studioBoastId: targetedId });

  const studioInfo = studioBoastsDetailData?.studioInfo;
  const unknownStudioInfo = studioBoastsDetailData?.unknownStudioInfo;

  if (isStudioBoastsDetailLoading && !studioBoastsDetailData) {
    return <Loading />;
  }

  return (
    <div className='gap-y-15 relative flex flex-col px-[calc(124px+56px)]'>
      <aside className='right-macro-48 top-67 absolute flex flex-col gap-y-6'>
        <StudioBoastsLikeButton
          studioBoastId={studioBoastsDetailData?.id || ''}
          likeCount={studioBoastsDetailData?.likeCount || 0}
          onLikeSelf={studioBoastsDetailData?.isLikedByRequestUser || false}
        />
        <StudioBoastsCommentButton
          commentCount={studioBoastsDetailData?.commentCount || 0}
        />
        <StudioBoastsShareButton />
        <StudioBoastsMoreButton
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
            <Button variant='text'>신고하기</Button>
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
            wrapperClassName='cursor-pointer'
            onClick={() => router.push(`/home?studioId=${studioInfo.id}`)}
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
    </div>
  );
}
