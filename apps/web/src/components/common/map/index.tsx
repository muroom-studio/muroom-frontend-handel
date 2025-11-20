'use client';

import { useCallback, useRef } from 'react';

import { useNaverMap } from '@/hooks/map/useNaverMap';
import { useMapOverlays } from '@/hooks/map/useMapOverlay';
import { useGeolocation } from '@/hooks/map/useGeolocation';

import CurrentLocationBtn from './ui/current-location-btn';
import ZoomControls from './ui/zoom-control-btn';
import LocationTag from './ui/location-tag';

import { MapState, MIN_ZOOM, MAX_ZOOM } from '@/hooks/nuqs/home/useMapState';

export type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  isAd: boolean;
  name: string;
  priceMin: number;
  priceMax: number;
};

interface Props {
  mapValue: MapState;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
  markers?: MarkerData[];
}

export default function CommonMap({ mapValue, setMapValue, markers }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleMarkerClick = useCallback(
    (id: string) => {
      setMapValue((prev) => ({
        ...prev,
        studioId: prev.studioId === id ? null : id,
      }));
    },
    [setMapValue],
  );

  const { mapInstance } = useNaverMap({
    mapRef,
    center: mapValue.center,
    zoom: mapValue.zoom,
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,

    setZoom: (newZoomUpdater) => {
      setMapValue((prev) => {
        const nextZoom =
          typeof newZoomUpdater === 'function'
            ? newZoomUpdater(prev.zoom)
            : newZoomUpdater;

        return {
          ...prev,
          zoom: Math.min(Math.max(nextZoom, MIN_ZOOM), MAX_ZOOM),
        };
      });
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
    markers,
    onMarkerClick: handleMarkerClick,
    selectedId: mapValue.studioId,
  });

  const handleZoomIn = useCallback(() => {
    setMapValue((prev) => ({
      ...prev,
      zoom: Math.min(MAX_ZOOM, prev.zoom + 1),
    }));
  }, [setMapValue]);

  const handleZoomOut = useCallback(() => {
    setMapValue((prev) => ({
      ...prev,
      zoom: Math.max(MIN_ZOOM, prev.zoom - 1),
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
    <div className='relative h-full w-full'>
      <div ref={mapRef} className='h-full w-full' />
      <div className='absolute right-4 top-4 z-50 flex flex-col gap-y-4'>
        <CurrentLocationBtn onClick={getCurrentLocation} />
        <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </div>

      <LocationTag
        mapCenter={mapValue.center}
        className='absolute bottom-10 left-1/2 z-50 -translate-x-1/2'
      />
    </div>
  );
}
