'use client';

import { useState } from 'react';
import { scroller } from 'react-scroll';
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
  const [activeTab, setActiveTab] = useState('building-info');
  const [isClickScrolling, setIsClickScrolling] = useState(false);

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

  const handleTabChange = (selectedTabId: string) => {
    setActiveTab(selectedTabId);
    setIsClickScrolling(true);

    scroller.scrollTo(selectedTabId, {
      duration: 500,
      smooth: false,
      containerId: 'detail-scroll-container',
      offset: 0,
    });

    setTimeout(() => setIsClickScrolling(false), 600);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isClickScrolling) return;

    const container = e.currentTarget;
    const scrollTop = container.scrollTop;

    const offset = 120;

    let currentId = DETAIL_TABS_DATA[0]?.id;

    for (const tab of DETAIL_TABS_DATA) {
      const element = document.getElementById(tab.id);

      if (element) {
        if (element.offsetTop - offset <= scrollTop) {
          currentId = tab.id;
        }
      }
    }

    if (currentId !== activeTab) {
      setActiveTab(currentId as string);
    }
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='mb-px flex-none bg-white'>
        <div className='flex overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          <TabBar
            level={3}
            tabs={DETAIL_TABS_DATA}
            initialActiveTabId={activeTab}
            onTabChange={handleTabChange}
            className='flex'
            btnClassName='px-[22px]'
          />
        </div>
      </div>

      <div
        id='detail-scroll-container'
        className='relative min-h-0 flex-1 overflow-y-auto bg-gray-100'
        onScroll={handleScroll}
      >
        <div className='flex flex-col gap-y-4'>
          <section id='building-info'>
            <BuildingInfoSection title='건물정보' />
          </section>

          <section id='notice'>
            <NoticeSection title='안내사항' />
          </section>

          <section id='room-info'>
            <RoomInfoSection title='방 정보' />
          </section>

          <section id='option'>
            <OptionSection title='옵션' />
          </section>

          <section id='near-facility'>
            <NearFacilitySection title='주변 시설' />
          </section>

          <section id='review'>
            <ReviewSection title='후기' />
          </section>
        </div>
      </div>
    </div>
  );
}
