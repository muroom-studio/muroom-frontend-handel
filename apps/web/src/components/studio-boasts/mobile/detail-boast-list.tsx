'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { ExpandedParagraph, UserBaseInfoLabel } from '@muroom/components';
import { getFormattedDate } from '@muroom/util';

import { StudioBoastsItemProps } from '@/types/studio-boasts';

import BoastCommentList from '../components/boast-comment-list';
import BoastDetailImageCarousel from '../components/boast-image-carousel';
import BoastSimpleCarousel from '../components/boast-simple-carousel';
import BoastStudioCard from '../components/boast-studio-card';
import {
  StudioBoastsCommentButton,
  StudioBoastsLikeButton,
  StudioBoastsMoreButton,
} from '../components/buttons';

interface Props {
  items: StudioBoastsItemProps[];
}

export default function DetailBoastList({ items }: Props) {
  const router = useRouter();

  const [openCommenstModalAndId, setOpenCommentsModalAndId] = useState({
    targetedId: '',
    isOpen: false,
  });

  return (
    <div className='flex flex-col gap-y-10'>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div id={item.id} className='flex flex-col gap-y-4'>
            <div className='flex-between px-5'>
              <UserBaseInfoLabel
                instrumentDescription={item.creatorUserInfo.instrument || ''}
                nickname={item.creatorUserInfo.nickname || ''}
              />
              <StudioBoastsMoreButton
                isMobile
                onSelf={item.isWrittenByRequestUser}
                studioBoastId={item.id || ''}
                instrumentDescription={item.creatorUserInfo.instrument || ''}
                nickname={item.creatorUserInfo.nickname || ''}
              />
            </div>

            <BoastDetailImageCarousel
              isMobile
              images={item?.imageFileUrls || []}
              initialIndex={0}
            />

            <div className='flex flex-col gap-y-3 px-5'>
              <ExpandedParagraph>{item.content}</ExpandedParagraph>
              {item.studioInfo ? (
                <BoastStudioCard
                  isMobile
                  variant='known'
                  id={item.studioInfo.id}
                  title={item.studioInfo.name}
                  minPrice={item.studioInfo.minPrice}
                  maxPrice={item.studioInfo.maxPrice}
                  thumbnailUrl={item.studioInfo.thumbnailImageFileUrl}
                  subwayInfo={item.studioInfo.nearestSubwayStation}
                  wrapperClassName='cursor-pointer'
                  onClick={() =>
                    router.push(`/home?studioId=${item?.studioInfo?.id}`)
                  }
                />
              ) : item.unknownStudioInfo ? (
                <BoastStudioCard
                  isMobile
                  variant='unknown'
                  id='unknown'
                  title={item.unknownStudioInfo.name}
                  subwayInfo={item.unknownStudioInfo.nearestSubwayStation}
                  address={`${item.unknownStudioInfo.roadNameAddress || item.unknownStudioInfo.lotNumberAddress || ''} ${item.unknownStudioInfo.detailedAddress || ''}`}
                />
              ) : null}
              <span className='text-base-s-12-1 text-gray-600'>
                {getFormattedDate(item?.createdAt, 'yy.MM.dd HH:mm')}
              </span>
            </div>

            <div className='flex items-center gap-x-3 px-5'>
              <StudioBoastsLikeButton
                isMobile
                studioBoastId={item?.id || ''}
                likeCount={item?.likeCount || 0}
                onLikeSelf={item?.isLikedByRequestUser || false}
              />
              <StudioBoastsCommentButton
                isMobile
                commentCount={item?.commentCount || 0}
                onClick={() =>
                  setOpenCommentsModalAndId({
                    targetedId: item.id,
                    isOpen: true,
                  })
                }
              />
            </div>
          </div>

          {index === 1 && (
            <BoastSimpleCarousel
              isMobile
              sort='likes,desc'
              title='인기있는 작업실 자랑'
            />
          )}
        </React.Fragment>
      ))}

      {openCommenstModalAndId.targetedId && (
        <BoastCommentList
          isMobile
          studioBoastId={openCommenstModalAndId.targetedId}
          isOpen={openCommenstModalAndId.isOpen}
          onClose={() =>
            setOpenCommentsModalAndId(() => ({
              targetedId: '',
              isOpen: false,
            }))
          }
        />
      )}
    </div>
  );
}
