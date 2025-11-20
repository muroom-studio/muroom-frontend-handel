'use client';

import { useEffect } from 'react';
import {
  useQueryState,
  parseAsInteger,
  createParser,
  parseAsString,
} from 'nuqs';

export interface MapState {
  center: { lat: number; lng: number };
  zoom: number;
  studioId: string | null;
}

export const MIN_ZOOM = 14;
export const MAX_ZOOM = 20;

// 기본값 정의
const DEFAULT_CENTER = {
  lat: 37.566,
  lng: 126.978,
};

const DEFAULT_ZOOM = 16;

const parseAsCenter = createParser({
  parse: (value) => {
    const parts = (value || '').split(',');
    if (parts.length !== 2) {
      return null;
    }
    const lat = parseFloat(parts[0]!);
    const lng = parseFloat(parts[1]!);
    if (isNaN(lat) || isNaN(lng)) {
      return null;
    }
    return { lat, lng };
  },
  serialize: (value) => `${value.lat},${value.lng}`,
});

function clampZoom(zoom: number) {
  return Math.min(Math.max(zoom, MIN_ZOOM), MAX_ZOOM);
}

export function useMapState(
  initialState?: Partial<MapState>,
): [MapState, (newState: MapState | ((prev: MapState) => MapState)) => void] {
  const initialCenter = initialState?.center ?? DEFAULT_CENTER;
  const initialZoom = clampZoom(initialState?.zoom ?? DEFAULT_ZOOM);
  const initialStudioId = initialState?.studioId ?? null;

  const [center, setCenter] = useQueryState(
    'center',
    parseAsCenter
      .withDefault(initialCenter)
      .withOptions({ clearOnDefault: false, shallow: true }),
  );

  const [zoom, setZoom] = useQueryState(
    'zoom',
    parseAsInteger
      .withDefault(initialZoom)
      .withOptions({ clearOnDefault: false, shallow: true }),
  );

  const [studioId, setStudioId] = useQueryState(
    'studioId',
    parseAsString
      .withDefault(initialStudioId ?? '')
      .withOptions({ clearOnDefault: false, shallow: true }),
  );

  useEffect(() => {
    setCenter(center ?? initialCenter);
    setZoom(clampZoom(zoom ?? initialZoom));

    if (initialStudioId) {
      setStudioId(initialStudioId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapValue: MapState = {
    center: center ?? initialCenter,
    zoom: clampZoom(zoom ?? initialZoom),
    studioId: studioId || null,
  };

  const setMapValue = (newState: MapState | ((prev: MapState) => MapState)) => {
    const state =
      typeof newState === 'function' ? newState(mapValue) : newState;

    setCenter(state.center);
    setZoom(clampZoom(state.zoom));
    setStudioId(state.studioId);
  };

  return [mapValue, setMapValue];
}
