'use client';

import { useRef, useEffect, useState } from 'react';
import type { Root } from 'react-dom/client';

import { cleanupMarkers, createMarkerWithReactRoot } from '@/utils/map/marker';
import { MarkerData, MarkerSize } from '@/types/map/markers';
import CustomMarker from '@/components/common/map/ui/custom-marker';

function getMarkerSize(zoom: number): MarkerSize {
  if (zoom < 15) return 'S';
  if (zoom < 17) return 'M';
  return 'L';
}

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

  const [currentZoom, setCurrentZoom] = useState<number>(14);

  useEffect(() => {
    if (!mapInstance) return;

    setCurrentZoom(mapInstance.getZoom());

    const listener = naver.maps.Event.addListener(
      mapInstance,
      'zoom_changed',
      () => {
        setCurrentZoom(mapInstance.getZoom());
      },
    );

    return () => {
      naver.maps.Event.removeListener(listener);
    };
  }, [mapInstance]);

  useEffect(() => {
    const map = mapInstance;

    if (!map || !markers) {
      cleanupMarkers(markerInstancesRef.current, rootInstancesRef.current);
      markerInstancesRef.current = [];
      rootInstancesRef.current = [];
      return;
    }

    cleanupMarkers(markerInstancesRef.current, rootInstancesRef.current);

    const newMarkers: naver.maps.Marker[] = [];
    const newRoots: Root[] = [];

    const size = getMarkerSize(currentZoom);

    markers.forEach((markerData) => {
      const isSelected = markerData.id === selectedId;

      const { marker, root } = createMarkerWithReactRoot(
        map,
        markerData,
        onMarkerClick || (() => {}),
        CustomMarker,
        size,
        isSelected,
      );

      newMarkers.push(marker);
      newRoots.push(root);
    });

    markerInstancesRef.current = newMarkers;
    rootInstancesRef.current = newRoots;

    return () => {
      cleanupMarkers(newMarkers, newRoots);
    };
  }, [mapInstance, markers, onMarkerClick, currentZoom, selectedId]); // 의존성에 zoom, selectedId 추가
}
