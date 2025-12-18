'use client';

import { useEffect, useRef, useState } from 'react';
import type { Root } from 'react-dom/client';

import CustomMarker from '@/components/common/map/ui/custom-marker';
import { MarkerSize, StudiosMapSearchItem } from '@/types/studios';
import { createMarkerWithReactRoot } from '@/utils/map/marker';

import { DEFAULT_ZOOM } from '../nuqs/home/useMapState';
import { useResponsiveLayout } from '../useResponsiveLayout';

function getMarkerSize(zoom: number, data: StudiosMapSearchItem): MarkerSize {
  const hasPrice = data.minPrice != null && data.maxPrice != null;

  if (zoom < 15) {
    return 'S';
  }

  if (zoom === 15) {
    return hasPrice ? 'M' : 'S';
  }

  if (zoom >= 16 && zoom <= 17) {
    return 'M';
  }

  return hasPrice ? 'L' : 'M';
}

type Props = {
  mapInstance: naver.maps.Map | null;
  markers: StudiosMapSearchItem[];
  onMarkerClick?: (id: string) => void;
  selectedId?: string | null;
};

type MarkerRef = {
  marker: naver.maps.Marker;
  root: Root;
  data: StudiosMapSearchItem;
};

export function useMapOverlays({
  mapInstance,
  markers,
  onMarkerClick,
  selectedId,
}: Props) {
  const { isMobile } = useResponsiveLayout();

  const markersRef = useRef<Map<string, MarkerRef>>(new Map());
  const [currentZoom, setCurrentZoom] = useState<number>(DEFAULT_ZOOM);

  // 줌 변경 감지
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

  // 1. 마커 생성 및 데이터 동기화 (Creation & Update Data)
  useEffect(() => {
    const map = mapInstance;
    if (!map) return;

    // [중요] ID를 무조건 문자열로 변환하여 관리 (Number vs String 혼동 방지)
    const newIds = new Set(markers.map((m) => String(m.id)));

    // 1-1. 사라진 마커 정리
    markersRef.current.forEach((value, key) => {
      if (!newIds.has(key)) {
        value.marker.setMap(null);
        setTimeout(() => {
          value.root.unmount();
        }, 0);
        markersRef.current.delete(key);
      }
    });

    // 1-2. 마커 생성 및 위치 업데이트
    markers.forEach((markerData) => {
      const strId = String(markerData.id); // Key를 문자열로 통일
      const existing = markersRef.current.get(strId);

      // 이미 존재하는 마커는 데이터(좌표 등)만 업데이트
      if (existing) {
        existing.data = markerData;
        existing.marker.setPosition(
          new naver.maps.LatLng(markerData.latitude, markerData.longitude),
        );
        return;
      }

      // 신규 마커 생성
      const size = getMarkerSize(currentZoom, markerData);

      const handleInternalClick = (clickedId: string) => {
        onMarkerClick?.(clickedId);
      };

      // 초기 선택 상태 계산
      const isSelected = String(markerData.id) === String(selectedId);

      const { marker, root } = createMarkerWithReactRoot(
        map,
        markerData,
        handleInternalClick,
        CustomMarker,
        size,
        isSelected,
        isMobile,
      );

      marker.setTitle('');

      // 저장 시 Key도 문자열로 통일
      markersRef.current.set(strId, {
        marker,
        root,
        data: markerData,
      });
    });
  }, [mapInstance, markers, isMobile, onMarkerClick]);
  // 주의: 여기엔 selectedId 의존성이 없어도 됨 (아래 useEffect에서 처리)

  // 2. 마커 리렌더링 (상태 동기화 - 선택, 줌, 데이터 변경 시)
  useEffect(() => {
    markersRef.current.forEach((ref) => {
      const size = getMarkerSize(currentZoom, ref.data);

      // [핵심 수정] ID 비교를 문자열로 변환하여 엄격하게 수행
      const isSelected = String(ref.data.id) === String(selectedId);

      const handleHoverChange = (isHovered: boolean) => {
        if (ref.marker) {
          const zIndex = isHovered ? 9999 : isSelected ? 100 : 10;
          ref.marker.setZIndex(zIndex);
        }
      };

      // React Component 리렌더링 -> 여기서 isSelected가 false로 내려가야 함
      ref.root.render(
        <CustomMarker
          isMobile={isMobile}
          minPrice={ref.data.minPrice}
          maxPrice={ref.data.maxPrice}
          name={ref.data.name}
          isAd={ref.data.isAd}
          size={size}
          isSelected={isSelected}
          onClick={() => onMarkerClick?.(String(ref.data.id))}
          onHoverChange={handleHoverChange}
        />,
      );

      // 네이버 마커 z-index 업데이트
      ref.marker.setZIndex(isSelected ? 100 : 10);
    });
  }, [selectedId, currentZoom, isMobile, onMarkerClick, markers]);

  useEffect(() => {
    return () => {
      markersRef.current.forEach((value) => {
        value.marker.setMap(null);
        setTimeout(() => {
          value.root.unmount();
        }, 0);
      });
      markersRef.current.clear();
    };
  }, []);
}
