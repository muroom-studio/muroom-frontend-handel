'use client';

import { useState, useEffect, useRef } from 'react';
import { scroller } from 'react-scroll';
import { Badge, Header, TabBar } from '@muroom/components';
import {
  HeartOutlineIcon,
  LocationIcon,
  ShareIcon,
  VisitListOutlineIcon,
} from '@muroom/icons';
import { Studio } from '@/types/studio';

import {
  BuildingInfoSection,
  NoticeSection,
  RoomInfoSection,
  OptionSection,
  NearFacilitySection,
} from './variants';

const HEADER_TABS_DATA = [
  { id: 'detail', label: '상세 정보' },
  { id: 'check', label: '방문확인' },
];

interface Props {
  detailStudio: Studio;
}

export default function DetailTabSection({ detailStudio }: Props) {
  const {
    name,
    priceMin,
    priceMax,
    nearestStation,
    lineInfo,
    walkingTime,
    address,
    vacancy,
  } = detailStudio;

  const [activeTab, setActiveTab] = useState('building-info');
  const [isClickScrolling, setIsClickScrolling] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabBarScrollRef = useRef<HTMLDivElement>(null);

  const TOP_HEADER_HEIGHT = 100;
  const TAB_HEIGHT = 46;
  const TOTAL_STICKY_HEIGHT = TOP_HEADER_HEIGHT + TAB_HEIGHT;

  const SCROLL_OFFSET = -TOTAL_STICKY_HEIGHT;

  const DETAIL_TABS_DATA = [
    { id: 'building-info', label: '건물정보' },
    { id: 'notice', label: '안내사항' },
    {
      id: 'room-info',
      label: (
        <div className='flex gap-x-1'>
          방정보
          <Badge variant='alert' count={vacancy || 0} />
        </div>
      ),
    },
    { id: 'option', label: '옵션' },
    { id: 'near-facility', label: '주변시설' },
  ];

  useEffect(() => {
    if (!tabBarScrollRef.current) return;
    const activeIndex = DETAIL_TABS_DATA.findIndex(
      (tab) => tab.id === activeTab,
    );
    if (activeIndex === -1) return;

    const tabButtons = tabBarScrollRef.current.querySelectorAll('button');
    const targetButton = tabButtons[activeIndex] as HTMLElement;

    if (targetButton) {
      tabBarScrollRef.current.scrollTo({
        left: targetButton.offsetLeft,
        behavior: 'smooth',
      });
    }
  }, [activeTab]);

  const handleHeaderTabChange = (selectedTabId: string) => {
    console.log('상단 탭 변경:', selectedTabId);
  };

  const handleDetailTabChange = (selectedTabId: string) => {
    setActiveTab(selectedTabId);
    setIsClickScrolling(true);

    scroller.scrollTo(selectedTabId, {
      duration: 500,
      smooth: true,
      containerId: 'detail-scroll-container',
      offset: SCROLL_OFFSET + 2,
    });

    setTimeout(() => setIsClickScrolling(false), 600);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isClickScrolling) return;

    const container = e.currentTarget;
    const scrollTop = container.scrollTop;

    // gap-y-4(16px) 등을 고려한 여유 값
    // 이 값이 클수록 탭이 "미리" 바뀝니다.
    // 싱크가 너무 늦게 맞으면 이 값을 5~10 정도 키우세요.
    const BUFFER = 20;

    // 기준선: 현재 스크롤 위치 + 눈에 보이는 헤더 총 높이 + 버퍼
    const scrollCheckLine = scrollTop + TOTAL_STICKY_HEIGHT + BUFFER;

    const isBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 10;

    if (isBottom) {
      const lastTabId = DETAIL_TABS_DATA[DETAIL_TABS_DATA.length - 1]?.id;
      if (activeTab !== lastTabId) setActiveTab(lastTabId as string);
      return;
    }

    let currentId = DETAIL_TABS_DATA[0]?.id;

    for (const tab of DETAIL_TABS_DATA) {
      const element = document.getElementById(tab.id);
      if (element) {
        if (element.offsetTop <= scrollCheckLine) {
          currentId = tab.id;
        }
      }
    }

    if (currentId && currentId !== activeTab) {
      setActiveTab(currentId as string);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll as any);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll as any);
      }
    };
  }, [isClickScrolling, activeTab]);

  return (
    <div
      id='detail-scroll-container'
      ref={scrollContainerRef}
      className='relative flex h-full flex-col overflow-y-auto bg-gray-100'
    >
      <div
        className='sticky top-0 z-50 border-b border-gray-300 bg-white'
        style={{ height: TOP_HEADER_HEIGHT }}
      >
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
          tabs={HEADER_TABS_DATA}
          initialActiveTabId='detail'
          onTabChange={handleHeaderTabChange}
          className='border-y border-y-gray-300'
        />
      </div>

      <div className='bg-white'>
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

      <div
        className='sticky z-40 border-b border-gray-200 bg-white'
        style={{ top: `${TOP_HEADER_HEIGHT}px` }}
      >
        <div
          ref={tabBarScrollRef}
          className='flex overflow-x-auto [&::-webkit-scrollbar]:hidden'
        >
          <TabBar
            level={3}
            tabs={DETAIL_TABS_DATA}
            initialActiveTabId={activeTab}
            onTabChange={handleDetailTabChange}
            className='flex'
            btnClassName='px-[22px]'
          />
        </div>
      </div>

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
          <NearFacilitySection
            title='주변 시설'
            description='네이버 도보 기준 5분 이내'
          />
        </section>
      </div>
    </div>
  );
}
