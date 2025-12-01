'use client';

import { useEffect, useRef, useState } from 'react';
import type { Root } from 'react-dom/client';

import CustomMarker from '@/components/common/map/ui/custom-marker';
import { MarkerSize, StudiosMapSearchItem } from '@/types/studios';
import { cleanupMarkers, createMarkerWithReactRoot } from '@/utils/map/marker';

import { useResponsiveLayout } from '../useResponsiveLayout';

function getMarkerSize(zoom: number): MarkerSize {
  if (zoom < 15) return 'S';
  if (zoom < 17) return 'M';
  return 'L';
}

type Props = {
  mapInstance: naver.maps.Map | null;
  markers: StudiosMapSearchItem[];
  onMarkerClick?: (id: string, lat: number, lng: number) => void;
  selectedId?: string | null;
};

export function useMapOverlays({
  mapInstance,
  markers,
  onMarkerClick,
  selectedId,
}: Props) {
  const { isMobile } = useResponsiveLayout();

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

      const handleInternalClick = (clickedId: string) => {
        if (onMarkerClick) {
          onMarkerClick(clickedId, markerData.latitude, markerData.longitude);
        }
      };

      const { marker, root } = createMarkerWithReactRoot(
        map,
        markerData,
        handleInternalClick || (() => {}),
        CustomMarker,
        size,
        isSelected,
        isMobile,
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
