import { useState } from 'react';

import Image from 'next/image';

import { Badge, Tag, ToggleButton } from '@muroom/components';
import { HeartIcon, StarIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';
import VacantThumnail from '@muroom/ui/assets/vacant-thumnail.svg';

import { MapState } from '@/hooks/nuqs/home/useMapState';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { StudiosMapListItem } from '@/types/studios';

interface Props {
  data: StudiosMapListItem;
  currentStudioId: string;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
}

export default function CommonStudioCard({
  data,
  currentStudioId,
  setMapValue,
}: Props) {
  const { isMobile } = useResponsiveLayout();
  const {
    // id,
    // name,
    // imageUrl,
    // priceMin,
    // priceMax,
    // nearestStation,
    // lineInfo,
    // walkingTime,
    // rating,
    // reviewCount,
    // isAd,
    // isNew,
    // isWished,
    // vacancy,
    // lat,
    // lng,
    studioId: numericStudioId,
    latitude,
    longitude,
    studioName,
    minPrice,
    maxPrice,
    nearbySubwayStationInfo,
    thumbnailImageUrl,
    walkingTimeMinutes,
  } = data as StudiosMapListItem;

  const studioId = String(numericStudioId);

  const lineInfo = nearbySubwayStationInfo.lines;

  return (
    <div
      className={cn(
        'flex cursor-pointer gap-x-3 border-b border-b-gray-300 px-4 py-6 transition-colors hover:bg-gray-100',
        {
          'bg-primary-50 hover:bg-primary-50': currentStudioId === studioId,
        },
        {
          'px-0': isMobile,
        },
      )}
      onClick={() =>
        setMapValue((prev) => ({
          ...prev,
          center: { lat: latitude, lng: longitude },
          studioId: prev.studioId === studioId ? null : studioId,
        }))
      }
    >
      <StudioImg
        thumbnailImageUrl={thumbnailImageUrl}
        alt={`${studioId} 스튜디오 이미지`}
        // isAd={isAd}
        // isNew={isNew}
        // isWished={isWished}
      />
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col gap-y-3'>
          <div className='flex-between'>
            <span className='text-title-s-22-1'>{`${minPrice / 10000}~${maxPrice / 10000}만원`}</span>
            {/* <div className='flex items-center'>
              <StarIcon />
              <p className='text-base-m-14-1 flex items-center gap-x-px'>
                <span>{rating}</span>
                <span className='text-gray-400'>({reviewCount})</span>
              </p>
            </div> */}
          </div>

          <div
            className={cn('flex', {
              'flex-col items-start gap-y-1': lineInfo.length >= 2,
              'items-center gap-x-1': lineInfo.length < 2,
            })}
          >
            <div className='flex items-center gap-x-1'>
              {Array.isArray(lineInfo) &&
                lineInfo.map((line) => (
                  <Badge
                    key={line.lineName}
                    variant='subway'
                    lineName={line.lineName}
                    lineColor={line.lineColor}
                  />
                ))}
            </div>

            <p className='text-base-m-14-1'>
              {`${nearbySubwayStationInfo.stationName}역 도보 ${walkingTimeMinutes}분`}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-x-1'>
          {/* {vacancy ? (
            <Tag variant='blue'>{vacancy}개 남음</Tag>
          ) : (
            <Tag variant='neutral' className='h-7'>
              방 없음
            </Tag>
          )} */}
          <p className='text-base-m-14-1 max-w-[130px] truncate text-gray-500'>
            {studioName}
          </p>
        </div>
      </div>
    </div>
  );
}

const StudioImg = ({
  thumbnailImageUrl,
  alt,
  // isAd,
  // isNew,
  // isWished,
}: Pick<StudiosMapListItem, 'thumbnailImageUrl'> & {
  alt: string;
}) => {
  // const [wish, setWish] = useState(isWished);

  return (
    <div className='relative h-[140px] w-[140px] shrink-0'>
      {/* <div className='flex-between absolute top-2 w-full px-2'>
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
      </div> */}
      {thumbnailImageUrl ? (
        <Image
          src={thumbnailImageUrl}
          alt={alt}
          width={140}
          height={140}
          unoptimized
          className='rounded-4 object-cover'
        />
      ) : (
        <div className='flex-center rounded-4 border border-gray-300 bg-white px-[39px] py-[45px]'>
          <Image
            src={VacantThumnail}
            alt={'빈 이미지'}
            width={62}
            height={50}
            unoptimized
            className='rounded-4 object-cover'
          />
        </div>
      )}
    </div>
  );
};
