'use client';

import { useEffect, useRef, useState } from 'react';
import type { Root } from 'react-dom/client';

import CustomMarker from '@/components/common/map/ui/custom-marker';
import { MarkerSize, StudiosMapSearchItem } from '@/types/studios';
import { createMarkerWithReactRoot } from '@/utils/map/marker';

import { useResponsiveLayout } from '../useResponsiveLayout';

function getMarkerSize(zoom: number): MarkerSize {
  if (zoom < 15) return 'S';
  if (zoom < 17) return 'M';
  return 'L';
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
    if (!map) return;

    const newIds = new Set(markers.map((m) => m.id));

    markersRef.current.forEach((value, key) => {
      if (!newIds.has(key)) {
        value.marker.setMap(null);

        setTimeout(() => {
          value.root.unmount();
        }, 0);

        markersRef.current.delete(key);
      }
    });

    const size = getMarkerSize(currentZoom);

    markers.forEach((markerData) => {
      const existing = markersRef.current.get(markerData.id);

      if (existing) {
        existing.data = markerData;
        existing.marker.setPosition(
          new naver.maps.LatLng(markerData.latitude, markerData.longitude),
        );
        return;
      }

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

      markersRef.current.set(markerData.id, {
        marker,
        root,
        data: markerData,
      });
    });
  }, [mapInstance, markers, isMobile, onMarkerClick]);

  useEffect(() => {
    const size = getMarkerSize(currentZoom);

    markersRef.current.forEach((ref) => {
      const isSelected = ref.data.id == selectedId;

      ref.root.render(
        <CustomMarker
          isMobile={isMobile}
          minPrice={ref.data.minPrice}
          maxPrice={ref.data.maxPrice}
          name={ref.data.name}
          isAd={ref.data.isAd}
          size={size}
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
