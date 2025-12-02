import { Tag } from '@muroom/components';

import { StudioBuildingInfo } from '@/types/studio';

import GridRowItem from '../../components/grid-row-item';
import SectionWrapper from '../../components/section-wrapper';
import ParkingBtn from './parking-btn';

interface Props {
  title: string;
  data: StudioBuildingInfo;
}

export default function BuildingInfoSection({ title, data }: Props) {
  return (
    <SectionWrapper title={title}>
      <>
        <GridRowItem
          title='지층'
          sub1={`${data.floorType.description} ${data.floorNumber}층`}
        />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='주차'
          sub1={
            <div className='flex-between'>
              <div className='flex items-center gap-x-1.5'>
                <span>{data.isParkingAvailable ? '가능' : '불가능'}</span>
                {data.parkingFeeType !== 'NONE' && (
                  <Tag variant='red'>
                    {data.parkingFeeType === 'PAID' ? '유료' : '무료'}
                  </Tag>
                )}
                <Tag variant='blue'>{data.parkingSpots}개 남음</Tag>
              </div>
              <ParkingBtn
                parkingInfo={{
                  parkingLocationAddress: data.parkingLocationAddress,
                  parkingLocationName: data.parkingLocationName,
                  parkingLocationLatitude: data.parkingLocationLatitude,
                  parkingLocationLongitude: data.parkingLocationLongitude,
                }}
              />
            </div>
          }
          sub2={<p className='text-base-l-16-1 mt-4'>{data.parkingFeeInfo}</p>}
        />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='숙식'
          sub1={data.isLodgingAvailable ? '가능' : '불가능'}
        />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='화재보험'
          sub1={data.hasFireInsurance ? '가입' : '미가입'}
        />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='가격'
          sub1={`${data.depositAmount / 10000}만원`}
          sub2={
            <div className='mt-[7px] flex items-center gap-x-2'>
              <Tag variant='blue'>첫달 30,000원 할인</Tag>
              <Tag variant='blue'>첫달 30,000원 할인</Tag>
            </div>
          }
        />
      </>
    </SectionWrapper>
  );
}
