'use client';

import DesktopHomePage from '@/components/home/desktop';
import MobileHomePage from '@/components/home/mobile';
import { useMapState } from '@/hooks/nuqs/home/useMapState';
import { DUMMY_STUDIO } from '@/types/studio';

interface Props {
  isMobile: boolean;
}

export default function HomePage({ isMobile }: Props) {
  const dummyCenterLocation = { lat: 37.5559247, lng: 126.9250109 };

  const [mapValue, setMapValue] = useMapState({
    center: dummyCenterLocation,
    zoom: 16,
  });

  const DUMMY_DATA = DUMMY_STUDIO; // 더미 작업실 data

  const DETAIL_DUMMY_DATA = DUMMY_DATA.find((d) => d.id === mapValue.studioId); // detail 더미 작업실 data

  const DUMMY_MARKER_DATA = DUMMY_DATA.map((studio) => ({
    id: studio.id,
    lat: studio.lat,
    lng: studio.lng,
    isAd: studio.isAd,
    name: studio.name,
    priceMin: studio.priceMin,
    priceMax: studio.priceMax,
  }));

  let content;

  content = isMobile ? (
    <MobileHomePage
      mapValue={mapValue}
      setMapValue={setMapValue}
      studios={DUMMY_DATA}
      detailStudio={DETAIL_DUMMY_DATA!}
      markersData={DUMMY_MARKER_DATA}
    />
  ) : (
    <DesktopHomePage
      mapValue={mapValue}
      setMapValue={setMapValue}
      studios={DUMMY_DATA}
      detailStudio={DETAIL_DUMMY_DATA!}
      markersData={DUMMY_MARKER_DATA}
    />
  );

  return <main className='h-full'>{content}</main>;
}
