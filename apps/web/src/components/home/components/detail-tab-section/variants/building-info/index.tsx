import { Tag } from '@muroom/components';

import { StudioBuildingInfo } from '@/types/studio';

import GridRowItem from '../../components/grid-row-item';
import SectionWrapper from '../../components/section-wrapper';
import ParkingBtn from './parking-btn';

interface Props {
  title: string;
  buildingData: StudioBuildingInfo;
  priceData: {
    minPrice: number;
    maxPrice: number;
    deposit: number;
  };
}

export default function BuildingInfoSection({
  title,
  buildingData,
  priceData,
}: Props) {
  return (
    <SectionWrapper title={title}>
      <>
        <GridRowItem
          title='지층'
          sub1={`${buildingData.floorType.description} ${buildingData.floorNumber}층`}
        />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='주차'
          sub1={
            <div className='flex-between'>
              <div className='flex items-center gap-x-1.5'>
                <span>
                  {buildingData.isParkingAvailable ? '가능' : '불가능'}
                </span>
                {buildingData.parkingFeeType.code !== 'NONE' &&
                  (buildingData.parkingFeeType.code === 'PAID' ? (
                    <Tag variant='red'>유료</Tag>
                  ) : (
                    <Tag variant='blue'>무료</Tag>
                  ))}
                <Tag variant='blue'>{buildingData.parkingSpots}개 남음</Tag>
              </div>
              {buildingData.parkingLocationName && (
                <ParkingBtn
                  parkingInfo={{
                    parkingLocationAddress:
                      buildingData.parkingLocationAddress as string,
                    parkingLocationName:
                      buildingData.parkingLocationName as string,
                    parkingLocationLatitude:
                      buildingData.parkingLocationLatitude as number,
                    parkingLocationLongitude:
                      buildingData.parkingLocationLongitude as number,
                  }}
                />
              )}
            </div>
          }
          sub2={
            <p className='text-base-l-16-1 mt-4'>
              {buildingData.parkingFeeInfo}
            </p>
          }
        />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='숙식'
          sub1={buildingData.isLodgingAvailable ? '가능' : '불가능'}
        />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='화재보험'
          sub1={buildingData.hasFireInsurance ? '가입' : '미가입'}
        />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='가격'
          sub1={`${priceData.minPrice / 10000}~${priceData.maxPrice / 10000}만원`}
          sub2={
            <div className='mt-[7px] flex items-center gap-x-2'>
              <Tag variant='blue'>첫달 30,000원 할인</Tag>
              <Tag variant='blue'>첫달 30,000원 할인</Tag>
            </div>
          }
        />
        <div className='h-px bg-gray-200' />
        <GridRowItem title='보증금' sub1={`${priceData.deposit / 10000}만원`} />
      </>
    </SectionWrapper>
  );
}
