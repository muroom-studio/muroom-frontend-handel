'use client';

import { useState } from 'react';

import { TargetIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useGeolocation } from '@/hooks/map/useGeolocation';
import { MapState } from '@/hooks/nuqs/home/useMapState';
import { compareCoords } from '@/utils/map/compare-coords';

interface Props {
  isMobile?: boolean;
  mapValue: MapState;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
  className?: string;
}

export default function CurrentLocationBtn({
  isMobile = false,
  mapValue,
  setMapValue,
  className,
}: Props) {
  const [localCenter, setLocalCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const { getCurrentLocation } = useGeolocation({
    onLocationFound: (coords) => {
      setMapValue((prev) => ({
        ...prev,
        center: coords,
      }));
      setLocalCenter({
        lat: coords.lat,
        lng: coords.lng,
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const isSameLocation = compareCoords(localCenter, mapValue.center);

  return (
    <button
      onClick={getCurrentLocation}
      className={cn(
        'flex-center rounded-4 shadow-level-1 cursor-pointer border border-gray-300 bg-white p-2.5',
        {
          'size-9 p-2': isMobile,
        },
        className,
      )}
      aria-label='현재 위치로 이동'
    >
      <TargetIcon
        className={`${isMobile ? 'size-5' : 'size-6'} ${isSameLocation ? 'text-primary-400' : 'text-gray-700'}`}
      />
    </button>
  );
}
