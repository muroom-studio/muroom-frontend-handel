'use client';

import { useRef, useEffect } from 'react';

import CustomMarkerLabel from '@/components/common/map/ui/custom-marker';

import type { Root } from 'react-dom/client';
import { cleanupMarkers, createMarkerWithReactRoot } from '@/utils/marker';

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  label: string;
};

type Props = {
  mapInstance: naver.maps.Map | null;
  infoWindowInstance: naver.maps.InfoWindow | null;
  markers?: MarkerData[];
  onMarkerClick?: (id: string) => void;
  selectedId?: string | null;
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

  // 3. [마커 훅] (로직 추상화)
  useEffect(() => {
    const map = mapInstance;
    // ⭐️ markers가 null이거나 map이 없으면, 기존 마커를 정리하고 종료합니다.
    if (!map || !markers) {
      cleanupMarkers(markerInstancesRef.current, rootInstancesRef.current);
      markerInstancesRef.current = [];
      rootInstancesRef.current = [];
      return;
    }

    const newMarkers: naver.maps.Marker[] = [];
    const newRoots: Root[] = [];

    // ⭐️ [생성] 복잡한 마커 생성 로직을 유틸리티 함수로 대체
    markers.forEach((markerData) => {
      const { marker, root } = createMarkerWithReactRoot(
        map,
        markerData,
        onMarkerClick || (() => {}),
        CustomMarkerLabel, // ⭐️ 컴포넌트 자체를 인자로 전달 (최종 수정 반영)
      );

      newMarkers.push(marker);
      newRoots.push(root);
    });

    // ⭐️ [저장] 생성된 인스턴스를 Ref에 저장
    markerInstancesRef.current = newMarkers;
    rootInstancesRef.current = newRoots;

    // [정리] cleanup 함수는 생성된 인스턴스들을 파괴합니다.
    return () => {
      // ⭐️ cleanupMarkers 유틸리티 함수 호출로 대체
      cleanupMarkers(newMarkers, newRoots);
    };
  }, [mapInstance, markers, onMarkerClick]);

  // 4. [InfoWindow 훅] (변경 없음 - Ref를 통해 인스턴스 사용)
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
