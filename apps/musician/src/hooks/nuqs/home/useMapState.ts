'use client';

import {
  createParser,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  useQueryStates,
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

  const [params, setParams] = useQueryStates(
    {
      center: parseAsCenter.withDefault(initialCenter),
      zoom: parseAsInteger.withDefault(initialZoom),
      studioId: parseAsString.withDefault(initialState?.studioId ?? ''),
      minLatitude: parseAsFloat,
      maxLatitude: parseAsFloat,
      minLongitude: parseAsFloat,
      maxLongitude: parseAsFloat,
    },
    {
      shallow: true,
      clearOnDefault: false,
    },
  );

  const mapValue: MapState = {
    center: params.center,
    zoom: clampZoom(params.zoom),
    studioId: params.studioId || null,
    bounds:
      params.minLatitude !== null &&
      params.maxLatitude !== null &&
      params.minLongitude !== null &&
      params.maxLongitude !== null
        ? {
            minLat: params.minLatitude,
            maxLat: params.maxLatitude,
            minLng: params.minLongitude,
            maxLng: params.maxLongitude,
          }
        : (initialState?.bounds ?? null),
  };

  const setMapValue = (newState: MapState | ((prev: MapState) => MapState)) => {
    const state =
      typeof newState === 'function' ? newState(mapValue) : newState;

    setParams({
      center: state.center,
      zoom: state.zoom,
      studioId: state.studioId,
      minLatitude: state.bounds?.minLat ?? null,
      maxLatitude: state.bounds?.maxLat ?? null,
      minLongitude: state.bounds?.minLng ?? null,
      maxLongitude: state.bounds?.maxLng ?? null,
    });
  };

  return [mapValue, setMapValue];
}
