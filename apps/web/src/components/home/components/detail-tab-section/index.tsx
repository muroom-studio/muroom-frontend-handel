'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { scroller } from 'react-scroll';

import { Badge, TabBar } from '@muroom/components';
import { LocationIcon } from '@muroom/icons';

import { StudioDetailResponseProps } from '@/types/studio';

import ImageGalleryModal, { useGalleryModal } from './components/gallery-modal';
import MainImageSection from './components/main-image-section';
import ShareBtn from './components/share-btn';
import {
  BuildingInfoSection,
  NearFacilitySection,
  NoticeSection,
  OptionSection,
  RoomInfoSection,
} from './variants';

interface Props {
  detailStudio: StudioDetailResponseProps;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const TOP_HEADER_HEIGHT = 100;
const TAB_HEIGHT = 46;
const TOTAL_STICKY_HEIGHT = TOP_HEADER_HEIGHT + TAB_HEIGHT;

const SCROLL_OFFSET = -TOTAL_STICKY_HEIGHT;

export default function DetailTabSection({
  detailStudio,
  containerRef,
}: Props) {
  const {
    studioName,
    studioMinPrice,
    studioMaxPrice,
    roadNameAddress,
    studioLongitude,
    studioLatitude,
    nearbySubwayStations,
  } = detailStudio.studioBaseInfo;

  const galleryController = useGalleryModal();

  // 2. 갤러리 모달에 넘겨줄 전체 이미지 데이터 구성
  const allGalleryImages = useMemo(
    () => ({
      main: detailStudio.studioImages.mainImageKeys || [],
      building: detailStudio.studioImages.buildingImageKeys || [],
      room: detailStudio.studioImages.roomImageKeys || [],
    }),
    [detailStudio.studioImages],
  );

  const [activeTab, setActiveTab] = useState('building-info');
  const [isClickScrolling, setIsClickScrolling] = useState(false);

  const tabBarScrollRef = useRef<HTMLDivElement>(null);

  const DETAIL_TABS_DATA = [
    { id: 'building-info', label: '건물정보' },
    { id: 'notice', label: '안내사항' },
    {
      id: 'room-info',
      label: (
        <div className='flex gap-x-1'>
          방정보
          <Badge
            variant='alert'
            count={
              detailStudio.studioRooms.rooms.filter((room) => room.isAvailable)
                .length || 0
            }
          />
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

  const handleDetailTabChange = (selectedTabId: string) => {
    setActiveTab(selectedTabId);
    setIsClickScrolling(true);

    scroller.scrollTo(selectedTabId, {
      duration: 0,
      smooth: false,
      containerId: 'detail-scroll-container',
      offset: SCROLL_OFFSET + 2,
    });

    setTimeout(() => setIsClickScrolling(false), 600);
  };

  const handleScroll = () => {
    if (isClickScrolling) return;

    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const BUFFER = 20;
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
    const container = containerRef.current;

    if (!container) return;

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [isClickScrolling, activeTab, containerRef]);

  return (
    <>
      <div className='bg-white'>
        <div className='relative h-[250px] w-full overflow-hidden'>
          <MainImageSection
            roomImgs={detailStudio.studioImages.mainImageKeys}
            controller={galleryController}
          />
        </div>
        <div className='px-5 py-6'>
          <div className='flex flex-col gap-y-6'>
            <div className='flex flex-col gap-y-2'>
              <div className='flex-between'>
                <span className='text-title-s-22-2'>{`${studioMinPrice / 10000}만원 ~ ${studioMaxPrice / 10000}만원`}</span>
                <ShareBtn />
              </div>
              <span className='text-base-m-14-1 text-gray-500'>
                {studioName}
              </span>
            </div>
            <div className='flex flex-col gap-y-3'>
              {nearbySubwayStations.map((place) => (
                <div
                  key={place.stationName}
                  className='flex items-center gap-x-1'
                >
                  {place.lines.map((line) => (
                    <Badge
                      key={line.lineName}
                      variant='subway'
                      lineName={line.lineName}
                      lineColor={line.lineColor}
                    />
                  ))}
                  <span className='text-base-m-14-1'>{`${place?.stationName}역 ${place?.distanceInMeters?.toLocaleString()}m`}</span>
                </div>
              ))}
              <div className='flex -translate-x-1 items-center gap-x-1'>
                <LocationIcon className='size-6 text-gray-400' />
                <span className='text-base-m-14-1'>{roadNameAddress}</span>
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
          <BuildingInfoSection
            title='건물정보'
            buildingData={detailStudio.studioBuildingInfo}
            priceData={{
              minPrice: detailStudio.studioBaseInfo.studioMinPrice,
              maxPrice: detailStudio.studioBaseInfo.studioMaxPrice,
              deposit: detailStudio.studioBaseInfo.depositAmount,
            }}
          />
        </section>

        <section id='notice'>
          <NoticeSection title='안내사항' data={detailStudio.studioNotice} />
        </section>
        <section id='room-info'>
          <RoomInfoSection
            title='방 정보'
            controller={galleryController}
            roomData={detailStudio.studioRooms}
            roomImgs={detailStudio.studioImages.roomImageKeys}
            blueprintImg={detailStudio.studioImages.blueprintImageKey}
            instruments={detailStudio.studioForbiddenInstruments.instruments}
          />
        </section>
        <section id='option'>
          <OptionSection title='옵션' data={detailStudio.studioOptions} />
        </section>
        <section id='near-facility'>
          <NearFacilitySection
            title='주변 시설'
            description='네이버 도보 기준 5분 이내'
            studioLatLng={{ lat: studioLatitude, lng: studioLongitude }}
          />
        </section>
      </div>

      <ImageGalleryModal
        controller={galleryController}
        images={allGalleryImages}
      />
    </>
  );
}
