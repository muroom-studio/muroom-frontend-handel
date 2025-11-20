'use client';

import { useRef, useEffect } from 'react';

import CustomMarkerLabel from '@/components/common/map/ui/custom-marker';

import type { Root } from 'react-dom/client';
import { cleanupMarkers, createMarkerWithReactRoot } from '@/utils/marker';
import { MarkerData } from '@/components/common/map';

type Props = {
  mapInstance: naver.maps.Map | null;
  markers?: MarkerData[];
  onMarkerClick?: (id: string) => void;
  selectedId?: string | null;
};

export function useMapOverlays({
  mapInstance,
  markers,
  onMarkerClick,
  selectedId,
}: Props) {
  const markerInstancesRef = useRef<naver.maps.Marker[]>([]);
  const rootInstancesRef = useRef<Root[]>([]);

  // 3. [마커 훅] (로직 추상화)
  useEffect(() => {
    const map = mapInstance;

    if (!map || !markers) {
      cleanupMarkers(markerInstancesRef.current, rootInstancesRef.current);
      markerInstancesRef.current = [];
      rootInstancesRef.current = [];
      return;
    }

    const newMarkers: naver.maps.Marker[] = [];
    const newRoots: Root[] = [];

    markers.forEach((markerData) => {
      const { marker, root } = createMarkerWithReactRoot(
        map,
        markerData,
        onMarkerClick || (() => {}),
        CustomMarkerLabel,
      );

      newMarkers.push(marker);
      newRoots.push(root);
    });

    markerInstancesRef.current = newMarkers;
    rootInstancesRef.current = newRoots;

    return () => {
      cleanupMarkers(newMarkers, newRoots);
    };
  }, [mapInstance, markers, onMarkerClick]);
}
