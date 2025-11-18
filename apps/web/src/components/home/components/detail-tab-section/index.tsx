'use client';

import { useEffect } from 'react';
import { scroller, Element, Events, scrollSpy } from 'react-scroll';
import { Badge, TabBar } from '@muroom/components';

import {
  BuildingInfoSection,
  NoticeSection,
  RoomInfoSection,
  OptionSection,
  NearFacilitySection,
  ReviewSection,
} from './variants';

interface Props {
  vacancy: number;
}

export default function DetailTabSection({ vacancy }: Props) {
  const DETAIL_TABS_DATA = [
    { id: 'building-info', label: '건물정보' },
    { id: 'notice', label: '안내사항' },
    {
      id: 'room-info',
      label: (
        <div className='flex gap-x-1'>
          방정보
          <Badge variant='alert' count={vacancy} />
        </div>
      ),
    },
    { id: 'option', label: '옵션' },
    { id: 'near-facility', label: '주변시설' },
    { id: 'review', label: '후기' },
  ];

  // 스크롤 이벤트 등록 (필수)
  useEffect(() => {
    Events.scrollEvent.register('begin', () => {});
    Events.scrollEvent.register('end', () => {});
    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  const handleTabChange = (selectedTabId: string) => {
    scroller.scrollTo(selectedTabId, {
      duration: 500,
      smooth: true,
      containerId: 'detail-scroll-container', // 아래 div ID와 일치 필수
      offset: 0,
    });
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='flex-none bg-white'>
        <div className='flex overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          <TabBar
            level={3}
            tabs={DETAIL_TABS_DATA}
            initialActiveTabId='building-info'
            onTabChange={handleTabChange}
            className='flex'
            btnClassName='px-[22px]'
          />
        </div>
      </div>

      <div
        id='detail-scroll-container'
        className='relative min-h-0 flex-1 overflow-y-auto bg-gray-100'
      >
        <div className='flex flex-col gap-y-4 pb-10'>
          <Element name='building-info'>
            <BuildingInfoSection title='건물정보' />
          </Element>

          <Element name='notice'>
            <NoticeSection title='안내사항' />
          </Element>

          <Element name='room-info'>
            <RoomInfoSection title='방 정보' />
          </Element>

          <Element name='option'>
            <OptionSection title='옵션' />
          </Element>

          <Element name='near-facility'>
            <NearFacilitySection title='주변 시설' />
          </Element>

          <Element name='review'>
            <ReviewSection title='후기' />
          </Element>
        </div>
      </div>
    </div>
  );
}
