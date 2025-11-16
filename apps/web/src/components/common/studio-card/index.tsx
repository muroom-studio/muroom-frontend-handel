import { useState } from 'react';

import Image from 'next/image';

import { Studio } from '@/app/types/studio';

import { Badge, Tag, ToggleButton } from '@muroom/components';

import { HeartIcon, StarIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

interface Props {
  data: Studio;
  studioId: string;
  setStudioId: (id: string) => void;
}

export default function CommonStudioCard({
  data,
  studioId,
  setStudioId,
}: Props) {
  const {
    id,
    name,
    imageUrl,
    priceMin,
    priceMax,
    nearestStation,
    lineInfo,
    walkingTime,
    rating,
    reviewCount,
    isAd,
    isNew,
    isWished,
    vacancy,
    lat,
    lng,
  } = data as Studio;

  return (
    <div
      className={cn(
        'flex cursor-pointer gap-x-3 border-b border-b-gray-300 px-4 py-6 transition-colors hover:bg-gray-100',
        {
          'bg-primary-50': studioId === id,
        },
      )}
      onClick={() => setStudioId(id)}
    >
      <StudioImg
        imageUrl={imageUrl}
        alt={`${id} 스튜디오 이미지`}
        isAd={isAd}
        isNew={isNew}
        isWished={isWished}
      />
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col gap-y-3'>
          <span className='text-title-s-22-1'>{`${priceMin}~${priceMax}만원`}</span>

          <div className='flex items-center gap-x-1'>
            <Badge variant='subway' line={lineInfo as string} />
            <span className='text-base-m-14-1'>{`${nearestStation} 도보 ${walkingTime}분`}</span>
          </div>

          <div className='flex items-center'>
            <StarIcon />
            <p className='text-base-m-14-1 flex items-center gap-x-px'>
              <span>{rating}</span>
              <span className='text-gray-400'>({reviewCount})</span>
            </p>
          </div>
        </div>

        <div className='flex items-center gap-x-1'>
          {vacancy ? (
            <Tag variant='blue'>{vacancy}개 남음</Tag>
          ) : (
            <Tag variant='neutral' className='h-7'>
              방 없음
            </Tag>
          )}
          <span className='text-base-m-14-1 text-gray-500'>{name}</span>
        </div>
      </div>
    </div>
  );
}

const StudioImg = ({
  imageUrl,
  alt,
  isAd,
  isNew,
  isWished,
}: Pick<Studio, 'imageUrl' | 'isAd' | 'isNew' | 'isWished'> & {
  alt: string;
}) => {
  const [wish, setWish] = useState(isWished);

  return (
    <div className='relative h-[140px] w-[140px]'>
      <div className='flex-between absolute top-2 w-full px-2'>
        <div className='flex items-center gap-x-1'>
          {isNew && (
            <Tag variant='primary' size='s' className='text-base-exs-10-1'>
              NEW
            </Tag>
          )}
          {isAd && (
            <Tag variant='secondary' size='s' className='text-base-exs-10-1'>
              AD
            </Tag>
          )}
        </div>
        <ToggleButton
          variant='outline_icon'
          selected={wish}
          onSelectedChange={setWish}
          className={`${wish ? 'bg-primary-400' : 'bg-gray-300'} rounded-1000 size-6 border-none text-white`}
        >
          <HeartIcon />
        </ToggleButton>
      </div>
      <Image
        src={imageUrl}
        alt={alt}
        width={140}
        height={140}
        unoptimized
        className='rounded-4 object-cover'
      />
    </div>
  );
};
