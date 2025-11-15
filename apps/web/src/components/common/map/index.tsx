'use client';

import { useCallback, useRef } from 'react';

import { useNaverMap } from '@/hooks/map/useNaverMap';
import { useMapOverlays } from '@/hooks/map/useMapOverlay';
import { useGeolocation } from '@/hooks/map/useGeolocation';

import CurrentLocationBtn from './ui/current-location-btn';
import ZoomControls from './ui/zoom-control-btn';

import { MapState } from '@/components/home/desktop';

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  label: string;
};

interface Props {
  mapValue: MapState;
  setMapValue: React.Dispatch<React.SetStateAction<MapState>>;
  markers?: MarkerData[];
}

export default function CommonMap({ mapValue, setMapValue, markers }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleMarkerClick = useCallback(
    (id: string) => {
      setMapValue((prev) => ({
        ...prev,
        selectedId: prev.selectedId === id ? null : id,
      }));
    },
    [setMapValue],
  );

  const { mapInstance, infoWindowInstance } = useNaverMap({
    mapRef,
    center: mapValue.center, // ⬅️ mapValue에서 값 사용
    zoom: mapValue.zoom, // ⬅️ mapValue에서 값 사용

    // ⬇️ setZoom과 onCenterChange를 setMapValue를 사용하는 인라인 콜백으로 변경
    setZoom: (newZoomUpdater) => {
      setMapValue((prev) => ({
        ...prev,
        // newZoomUpdater가 (prev) => prev + 1 같은 함수일 수 있으므로 처리
        zoom:
          typeof newZoomUpdater === 'function'
            ? newZoomUpdater(prev.zoom)
            : newZoomUpdater,
      }));
    },
    onCenterChange: (newCenter) => {
      setMapValue((prev) => ({
        ...prev,
        center: newCenter,
      }));
    },
  });

  useMapOverlays({
    mapInstance,
    infoWindowInstance,
    markers,
    onMarkerClick: handleMarkerClick,
    selectedId: mapValue.selectedId,
  });

  const handleZoomIn = useCallback(() => {
    setMapValue((prev) => ({
      ...prev,
      zoom: Math.min(21, prev.zoom + 1),
    }));
  }, [setMapValue]);

  const handleZoomOut = useCallback(() => {
    setMapValue((prev) => ({
      ...prev,
      zoom: Math.max(0, prev.zoom - 1),
    }));
  }, [setMapValue]);

  const { getCurrentLocation } = useGeolocation({
    onLocationFound: (coords) => {
      setMapValue((prev) => ({
        ...prev,
        center: coords,
      }));
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
      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        className='absolute right-4 top-4 z-10'
      />
    </div>
  );
}
