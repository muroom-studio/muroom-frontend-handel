'use client';

import { useState } from 'react';

import GridRowItem from '../components/grid-row-item';
import SectionWrapper from '../components/section-wrapper';

import { Button, Modal, Tag } from '@muroom/components';
import StaticMap from '@/components/common/static-map';

interface Props {
  title: string;
}

export default function BuildingInfoSection({ title }: Props) {
  const [showParkingModal, setShowParkingModal] = useState(false);

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
              <Button
                variant='outline'
                size='s'
                onClick={() => setShowParkingModal(true)}
              >
                위치
              </Button>
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

      <Modal
        isOpen={showParkingModal}
        onClose={() => setShowParkingModal(false)}
      >
        <Modal.Wrapper className='px-0'>
          <Modal.Header title='주차장 위치' className='border-b-0 px-5' />
          <Modal.Body className='border-t border-t-gray-200 pt-0'>
            <div className='flex flex-col pb-5'>
              <StaticMap
                centerLat={37.3595704}
                centerLng={127.105399}
                height={195}
              />
              <div className='flex flex-col gap-y-1 border-t border-t-gray-200 px-5 pt-5'>
                <p className='text-base-l-16-2'>잠원수영장옆공영주차장</p>
                <p className='text-base-l-16-1'>서울 서초구 잠원동 86</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='outline'
              size='xl'
              onClick={() => setShowParkingModal(false)}
            >
              확인
            </Button>
          </Modal.Footer>
        </Modal.Wrapper>
      </Modal>
    </SectionWrapper>
  );
}
