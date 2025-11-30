import { Tag } from '@muroom/components';

import GridRowItem from '../../components/grid-row-item';
import SectionWrapper from '../../components/section-wrapper';
import ParkingBtn from './parking-btn';

interface Props {
  title: string;
}

export default function BuildingInfoSection({ title }: Props) {
  return (
    <SectionWrapper title={title}>
      <>
        <GridRowItem title='지층' sub1={'지상 3층'} />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='주차'
          sub1={
            <div className='flex-between'>
              <div className='flex items-center gap-x-1.5'>
                <span>가능</span>
                <Tag variant='red'>유료</Tag>
                <Tag variant='blue'>3개 남음</Tag>
              </div>
              <ParkingBtn />
            </div>
          }
          sub2={<p className='text-base-l-16-1 mt-4'>매월 3만원</p>}
        />
        <div className='h-px bg-gray-200' />
        <GridRowItem title='숙식' sub1={'가능'} />
        <div className='h-px bg-gray-200' />
        <GridRowItem title='화재보험' sub1={'가입'} />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='가격'
          sub1={'15~20만원'}
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
