'use client';

import { useState } from 'react';

import StaticMap from '@/components/common/static-map';

import SectionWrapper from '../../components/section-wrapper';

import { ToggleButton } from '@muroom/components';

import { cn } from '@muroom/lib';

interface Props {
  title: string;
  description?: string;
}

type targetPlace = '편의점' | '카페' | '식당' | '빨래방';

export default function NearFacilitySection({ title, description }: Props) {
  const [nearItem, setNearItem] = useState<targetPlace>('편의점');

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
                    setNearItem(place as targetPlace);
                  }
                }}
              >
                {place}
              </ToggleButton>
            ))}
          </div>
          <StaticMap
            centerLat={37.3595704}
            centerLng={127.105399}
            height={195}
            nearbyPlaces={[
              { id: '1', lat: 37.3635, lng: 127.1095 },
              { id: '2', lat: 37.3565, lng: 127.1015 },
              { id: '3', lat: 37.361, lng: 127.0995 },
            ]}
          />
        </div>

        <div>
          {dummy_place.map((place) => (
            <PlcaeRow
              key={place.name}
              name={place.name}
              distance={place.distance}
              className={cn(
                'border-y border-y-gray-200 py-4',
                'first:border-t-0 first:pt-0',
                'last:border-none last:pb-0',
              )}
            />
          ))}
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
    <div className={cn('flex items-center gap-x-4', className)}>
      <div className='size-[50px] bg-green-200' />
      <div className='flex flex-col justify-between'>
        <p className='text-base-exl-18-2'>{name}</p>
        <p className='text-base-m-14-1 text-gray-600'>{`연습실에서 ${distance}m`}</p>
      </div>
    </div>
  );
};

const dummy_place = [
  { name: 'GS25 강남시티힐점', distance: 23 },
  { name: '이마트24 R강남역삼점', distance: 36 },
  { name: '세븐일레븐 뉴강남센터점', distance: 45 },
];
