'use client';

import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';
import { HOME_MARKER_HTML, SHOP_MARKER_HTML } from './ui/custom-marker';

interface StaticMapProps {
  centerLat: number;
  centerLng: number;
  height?: number;
  nearbyPlaces?: { id: string; lat: number; lng: number }[];
}

export default function StaticMap({
  centerLat,
  centerLng,
  height,
  nearbyPlaces = [],
}: StaticMapProps) {
  const lat = centerLat || 37.5665;
  const lng = centerLng || 126.978;

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
            content: HOME_MARKER_HTML,
            size: { width: 48, height: 48 },
            anchor: { x: 24, y: 24 },
          }}
        />

        {nearbyPlaces.map((place) => (
          <Marker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            icon={{
              content: SHOP_MARKER_HTML,
              size: { width: 40, height: 40 },
              anchor: { x: 20, y: 20 },
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
