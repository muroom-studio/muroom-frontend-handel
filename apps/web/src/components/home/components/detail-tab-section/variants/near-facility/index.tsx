'use client';

import { useState } from 'react';

import { Spinner, ToggleButton } from '@muroom/components';
import { cn } from '@muroom/lib';

import StaticMap from '@/components/common/static-map';
import { useNearbyFetch } from '@/hooks/api/kakao/useNearByFetch';

import SectionWrapper from '../../components/section-wrapper';

interface Props {
  title: string;
  description?: string;
  studioLatLng: { lat: number; lng: number };
}

export type TargetPlace = '편의점' | '카페' | '식당' | '빨래방';

export default function NearFacilitySection({
  title,
  description,
  studioLatLng,
}: Props) {
  const [nearItem, setNearItem] = useState<TargetPlace>('편의점');

  const { places, isLoading } = useNearbyFetch({
    lat: studioLatLng.lat,
    lng: studioLatLng.lng,
    category: nearItem,
  });

  return (
    <SectionWrapper title={title} description={description}>
      <>
        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center gap-x-3'>
            {['편의점', '카페', '식당', '빨래방'].map((place) => (
              <ToggleButton
                key={place}
                variant='outline'
                size='m'
                selected={nearItem === place}
                onSelectedChange={(isSelected) => {
                  if (isSelected) {
                    setNearItem(place as TargetPlace);
                  }
                }}
              >
                {place}
              </ToggleButton>
            ))}
          </div>
          <StaticMap
            centerLat={studioLatLng.lat}
            centerLng={studioLatLng.lng}
            height={195}
            placeCategory={nearItem}
            nearbyPlaces={places}
          />
        </div>

        <div>
          {isLoading && <Spinner variant={'component'} />}
          {places.length > 0 ? (
            places.map((place) => (
              <PlcaeRow
                key={place.id}
                name={place.name}
                distance={place.distance}
                className={cn(
                  'border-y border-y-gray-200 py-4',
                  'first:border-t-0 first:pt-0',
                  'last:border-none last:pb-0',
                )}
              />
            ))
          ) : (
            <p className='text-base-l-16-1 flex-center min-h-40 text-center text-gray-400'>
              도보 5분 기준이내 주변시설이 없습니다 <br />
              다른 시설을 확인해볼까요?
            </p>
          )}
        </div>
      </>
    </SectionWrapper>
  );
}

const PlcaeRow = ({
  name,
  distance,
  className,
}: {
  name: string;
  distance: number;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col gap-y-2', className)}>
      <p className='text-base-exl-18-2'>{name}</p>
      <p className='text-base-m-14-1 text-gray-600'>{`연습실에서 ${distance}m`}</p>
    </div>
  );
};
