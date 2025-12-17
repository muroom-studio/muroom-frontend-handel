'use client';

import { useEffect } from 'react';

import {
  createParser,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';

export interface Bounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

export interface MapState {
  center: { lat: number; lng: number };
  zoom: number;
  studioId: string | null;
  bounds: Bounds | null;
}

export const MIN_ZOOM = 13;
export const MAX_ZOOM = 17;

const DEFAULT_CENTER = {
  lat: 37.566,
  lng: 126.978,
};

export const DEFAULT_ZOOM = 16;

const parseAsCenter = createParser({
  parse: (value) => {
    const parts = (value || '').split(',');
    if (parts.length !== 2) return null;
    const lat = parseFloat(parts[0]!);
    const lng = parseFloat(parts[1]!);
    if (isNaN(lat) || isNaN(lng)) return null;
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
  const initialBounds = initialState?.bounds ?? null;

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

  const [minLat, setMinLat] = useQueryState(
    'minLatitude',
    parseAsFloat.withOptions({ shallow: true }),
  );
  const [maxLat, setMaxLat] = useQueryState(
    'maxLatitude',
    parseAsFloat.withOptions({ shallow: true }),
  );
  const [minLng, setMinLng] = useQueryState(
    'minLongitude',
    parseAsFloat.withOptions({ shallow: true }),
  );
  const [maxLng, setMaxLng] = useQueryState(
    'maxLongitude',
    parseAsFloat.withOptions({ shallow: true }),
  );

  useEffect(() => {
    if (!center) setCenter(initialCenter);
    if (!zoom) setZoom(initialZoom);
    if (initialStudioId && !studioId) setStudioId(initialStudioId);

    if (initialBounds && (!minLat || !maxLat || !minLng || !maxLng)) {
      setMinLat(initialBounds.minLat);
      setMaxLat(initialBounds.maxLat);
      setMinLng(initialBounds.minLng);
      setMaxLng(initialBounds.maxLng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentBounds: Bounds | null =
    minLat !== null && maxLat !== null && minLng !== null && maxLng !== null
      ? { minLat, maxLat, minLng, maxLng }
      : null;

  const mapValue: MapState = {
    center: center ?? initialCenter,
    zoom: clampZoom(zoom ?? initialZoom),
    studioId: studioId || null,
    bounds: currentBounds,
  };

  const setMapValue = (newState: MapState | ((prev: MapState) => MapState)) => {
    const state =
      typeof newState === 'function' ? newState(mapValue) : newState;

    if (state.center !== mapValue.center) setCenter(state.center);
    if (state.zoom !== mapValue.zoom) setZoom(clampZoom(state.zoom));
    if (state.studioId !== mapValue.studioId) setStudioId(state.studioId);

    if (state.bounds) {
      if (state.bounds.minLat !== minLat) setMinLat(state.bounds.minLat);
      if (state.bounds.maxLat !== maxLat) setMaxLat(state.bounds.maxLat);
      if (state.bounds.minLng !== minLng) setMinLng(state.bounds.minLng);
      if (state.bounds.maxLng !== maxLng) setMaxLng(state.bounds.maxLng);
    } else if (mapValue.bounds) {
      setMinLat(null);
      setMaxLat(null);
      setMinLng(null);
      setMaxLng(null);
    }
  };

  return [mapValue, setMapValue];
}
