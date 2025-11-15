'use client';

import { useRef } from 'react';

import CurrentLocationBtn from '../current-location-btn';
import { useNaverMap } from '@/hooks/map/useNaverMap';
import { useMapOverlays } from '@/hooks/map/useMapOverlay';
import { useGeolocation } from '@/hooks/map/useGeolocation';

type MarkerData = {
  id: string | number;
  lat: number;
  lng: number;
  label: string;
};

type MapCanvasProps = {
  center: { lat: number; lng: number };
  zoom: number;
  markers?: MarkerData[];
  onMarkerClick?: (id: string | number) => void;
  selectedId?: string | number | null;
  onLocationChange: (coords: { lat: number; lng: number }) => void;
};

export default function MapCanvas({
  center,
  zoom,
  markers,
  onMarkerClick,
  selectedId, // 2. ⭐️ 'selectedId' prop 받기
  onLocationChange,
}: MapCanvasProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  // 2. ⭐️ [지도 생성/업데이트] 훅을 한 번만 호출
  const { mapInstance, infoWindowInstance } = useNaverMap({
    mapRef,
    center,
    zoom,
  });

  // 3. ⭐️ [오버레이] 훅 호출 (변경 없음)
  useMapOverlays({
    mapInstance,
    infoWindowInstance,
    markers,
    onMarkerClick,
    selectedId,
  });

  const { getCurrentLocation } = useGeolocation({
    onLocationFound: (coords) => {
      // ⭐️ 훅으로부터 받은 좌표를 부모가 넘겨준 함수를 통해 부모 상태에 전달
      onLocationChange(coords);
    },
    onError: (error) => {
      alert('위치 탐색 중 에러 발생: ' + error.message);
    },
  });

  return (
    <div ref={mapRef} className='relative h-full w-full'>
      <CurrentLocationBtn
        className='absolute bottom-4 left-4 z-10'
        onClick={getCurrentLocation}
      />
    </div>
  );
}
