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

  // 마커 생성 및 제거 로직
  useEffect(() => {
    const map = mapInstance;
    if (!map) return;

    const newIds = new Set(markers.map((m) => m.id));

    // 1. 사라진 마커 정리
    markersRef.current.forEach((value, key) => {
      if (!newIds.has(key)) {
        value.marker.setMap(null);

        setTimeout(() => {
          value.root.unmount();
        }, 0);

        markersRef.current.delete(key);
      }
    });

    // 2. 마커 생성 및 위치 업데이트
    markers.forEach((markerData) => {
      const existing = markersRef.current.get(markerData.id);

      // 이미 존재하는 마커는 데이터와 위치만 업데이트
      if (existing) {
        existing.data = markerData;
        existing.marker.setPosition(
          new naver.maps.LatLng(markerData.latitude, markerData.longitude),
        );
        return;
      }

      // [수정 2] 개별 데이터에 맞춰 사이즈 계산
      const size = getMarkerSize(currentZoom, markerData);

      const handleInternalClick = (clickedId: string) => {
        if (onMarkerClick) {
          onMarkerClick(clickedId);
        }
      };

      const isSelected = markerData.id == selectedId;

      const { marker, root } = createMarkerWithReactRoot(
        map,
        markerData,
        handleInternalClick,
        CustomMarker,
        size,
        isSelected,
        isMobile,
      );

      // 기본 툴팁 제거
      marker.setTitle('');

      markersRef.current.set(markerData.id, {
        marker,
        root,
        data: markerData,
      });
    });
  }, [mapInstance, markers, isMobile, onMarkerClick]); // currentZoom은 아래 useEffect에서 렌더링을 처리하므로 여기선 제외 가능

  // 마커 리렌더링 (줌 변경, 선택 변경 시)
  useEffect(() => {
    // 줌이 바뀌면 사이즈 로직이 달라질 수 있으므로 전체 다시 그리기
    markersRef.current.forEach((ref) => {
      // [수정 3] 여기서도 개별 데이터(ref.data)를 이용해 사이즈 재계산
      const size = getMarkerSize(currentZoom, ref.data);

      const isSelected = ref.data.id == selectedId;

      ref.root.render(
        <CustomMarker
          isMobile={isMobile}
          minPrice={ref.data.minPrice}
          maxPrice={ref.data.maxPrice}
          name={ref.data.name}
          isAd={ref.data.isAd}
          size={size} // 개별 계산된 사이즈 전달
          isSelected={isSelected}
          onClick={() => onMarkerClick?.(ref.data.id)}
        />,
      );

      ref.marker.setZIndex(isSelected ? 100 : 10);
    });
  }, [selectedId, currentZoom, isMobile, onMarkerClick]);

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
