'use client';

import { useRef, useEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';

import CustomMarkerLabel from '@/components/common/map/custom-marker';

type MarkerData = {
  id: string | number;
  lat: number;
  lng: number;
  label: string;
};

type Props = {
  mapInstance: naver.maps.Map | null;
  infoWindowInstance: naver.maps.InfoWindow | null;
  markers?: MarkerData[];
  onMarkerClick?: (id: string | number) => void;
  selectedId?: string | number | null;
};

// 1. 마커/정보창 관리 훅
export function useMapOverlays({
  mapInstance,
  infoWindowInstance,
  markers,
  onMarkerClick,
  selectedId,
}: Props) {
  // 2. 마커와 Root 인스턴스를 저장할 Ref
  const markerInstancesRef = useRef<naver.maps.Marker[]>([]);
  const rootInstancesRef = useRef<Root[]>([]);

  // 3. [마커 훅]
  useEffect(() => {
    const map = mapInstance;
    if (!map || !markers) return;

    const newMarkers: naver.maps.Marker[] = [];
    const newRoots: Root[] = [];

    markers.forEach((markerData) => {
      const container = document.createElement('div');
      const root = createRoot(container);
      root.render(
        <CustomMarkerLabel
          label={markerData.label}
          onClick={() => {
            onMarkerClick?.(markerData.id);
          }}
        />,
      );

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(markerData.lat, markerData.lng),
        map: map,
        icon: { content: container, anchor: new naver.maps.Point(0, 0) },
        title: String(markerData.id),
        clickable: false,
      });

      newMarkers.push(marker);
      newRoots.push(root);
    });

    markerInstancesRef.current = newMarkers;
    rootInstancesRef.current = newRoots;

    // [정리]
    return () => {
      setTimeout(() => {
        newRoots.forEach((root) => root.unmount());
        newMarkers.forEach((marker) => marker.setMap(null));
      }, 0);
    };
  }, [mapInstance, markers, onMarkerClick]);

  // 4. [InfoWindow 훅]
  useEffect(() => {
    const map = mapInstance;
    const infoWindow = infoWindowInstance;
    if (!map || !infoWindow) return;

    if (selectedId === null) {
      infoWindow.close();
      return;
    }

    const targetMarker = markerInstancesRef.current.find(
      (marker) => marker.getTitle() === String(selectedId),
    );

    if (targetMarker) {
      const markerData = markers?.find((m) => m.id === selectedId);
      infoWindow.setContent(`
        <div style="padding: 10px; font-weight: bold; font-size: 14px;">
          ${markerData?.label || '정보 없음'}
        </div>
      `);
      infoWindow.open(map, targetMarker);
    } else {
      infoWindow.close();
    }
  }, [mapInstance, infoWindowInstance, selectedId, markers]);
}
