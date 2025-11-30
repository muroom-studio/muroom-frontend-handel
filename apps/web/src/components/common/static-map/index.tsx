'use client';

import { Container as MapDiv, Marker, NaverMap } from 'react-naver-maps';

import { TargetPlace } from '@/components/home/components/detail-tab-section/variants/near-facility';
import { PlaceData } from '@/hooks/api/kakao/useNearByFetch';

import {
  CAFE_MARKER_HTML,
  CONVENIENCE_MARKER_HTML,
  HOME_MARKER_HTML,
  LAUNDRY_MARKER_HTML,
  PARKING_MARKER_HTML,
  RESTRAUNT_MARKER_HTML,
} from './ui/custom-marker';

interface StaticMapProps {
  centerLat: number;
  centerLng: number;
  height?: number;
  targetedCenter?: 'studio' | 'parking';
  placeCategory?: TargetPlace;
  nearbyPlaces?: PlaceData[];
}

export default function StaticMap({
  centerLat,
  centerLng,
  height,
  targetedCenter = 'studio',
  placeCategory,
  nearbyPlaces = [],
}: StaticMapProps) {
  const lat = centerLat || 37.5665;
  const lng = centerLng || 126.978;

  const MARKER_MAP: Record<TargetPlace, string> = {
    편의점: CONVENIENCE_MARKER_HTML,
    카페: CAFE_MARKER_HTML,
    식당: RESTRAUNT_MARKER_HTML,
    빨래방: LAUNDRY_MARKER_HTML,
  };

  const currentCategoryMarkerHtml = placeCategory
    ? MARKER_MAP[placeCategory]
    : '';

  return (
    <MapDiv
      style={{
        width: '100%',
        height: `${height}px`,
        position: 'relative',
      }}
    >
      <NaverMap
        center={{ lat, lng }}
        defaultZoom={18}
        draggable={false}
        scrollWheel={false}
        keyboardShortcuts={false}
        scaleControl={false}
        zoomControl={false}
        mapDataControl={false}
      >
        <Marker
          position={{ lat, lng }}
          icon={{
            content:
              targetedCenter === 'studio'
                ? HOME_MARKER_HTML
                : PARKING_MARKER_HTML,
            size: { width: 48, height: 48 },
            anchor: { x: 24, y: 24 },
          }}
        />

        {nearbyPlaces.map((place) => (
          <Marker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            icon={{
              content: currentCategoryMarkerHtml,
              size: { width: 24, height: 24 },
              anchor: { x: 12, y: 12 },
            }}
          />
        ))}
      </NaverMap>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 100,
          background: 'transparent',
        }}
      />
    </MapDiv>
  );
}
