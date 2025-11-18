'use client';

import DetailTabSection from '@/components/home/components/detail-tab-section';

import { Badge, Header, TabBar } from '@muroom/components';

import {
  HeartOutlineIcon,
  LocationIcon,
  ShareIcon,
  VisitListOutlineIcon,
} from '@muroom/icons';

import { Studio } from '@/app/types/studio';

const TABS_DATA = [
  { id: 'detail', label: '상세 정보' },
  { id: 'check', label: '방문확인' },
];

interface Props {
  detailStudio: Studio;
}

export default function CommonDetailStudio({ detailStudio }: Props) {
  const {
    id,
    name,
    imageUrl,
    priceMin,
    priceMax,
    nearestStation,
    lineInfo,
    walkingTime,
    address,
    rating,
    reviewCount,
    isAd,
    isNew,
    isWished,
    vacancy,
    lat,
    lng,
  } = detailStudio as Studio;

  const handleTabChange = (selectedTabId: string) => {
    console.log('선택된 탭 ID:', selectedTabId);
  };

  return (
    <div className='shadow-detail flex h-full flex-col overflow-hidden border-r border-r-gray-300'>
      <div className='shrink-0'>
        <Header
          title={name}
          onBackClick={() => {}}
          rightSlot={
            <>
              <VisitListOutlineIcon className='size-6' />
              <HeartOutlineIcon className='size-6' />
            </>
          }
        />
        <TabBar
          level={2}
          tabs={TABS_DATA}
          initialActiveTabId='detail'
          onTabChange={handleTabChange}
          className='border-y border-y-gray-300'
        />

        <div className='h-[250px] w-full bg-red-600' />

        <div className='px-5 py-6'>
          <div className='flex flex-col gap-y-6'>
            <div className='flex flex-col gap-y-2'>
              <div className='flex-between'>
                <span className='text-title-s-22-2'>{`${priceMin}만원 ~ ${priceMax}만원`}</span>
                <ShareIcon className='size-6' />
              </div>
              <span className='text-base-m-14-1 text-gray-500'>{name}</span>
            </div>

            <div className='flex flex-col gap-y-3'>
              <div className='flex items-center gap-x-1'>
                {Array.isArray(lineInfo) &&
                  lineInfo.map((line) => (
                    <Badge key={line} variant='subway' line={line} />
                  ))}
                <span className='text-base-m-14-1'>{`${nearestStation} 도보 ${walkingTime}분`}</span>
              </div>
              <div className='flex -translate-x-1 items-center gap-x-1'>
                <LocationIcon className='size-6 text-gray-400' />
                <span className='text-base-m-14-1'>{address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex min-h-0 flex-1 flex-col'>
        <DetailTabSection vacancy={vacancy} />
      </div>
    </div>
  );
}
