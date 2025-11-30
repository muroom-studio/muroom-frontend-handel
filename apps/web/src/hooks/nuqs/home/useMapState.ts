'use client';

import { useEffect } from 'react';

import {
  createParser,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';

// 1. Bounds 인터페이스 정의
export interface Bounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

// 2. MapState 인터페이스 정의
export interface MapState {
  center: { lat: number; lng: number };
  zoom: number;
  studioId: string | null;
  bounds: Bounds | null;
}

export const MIN_ZOOM = 14;
export const MAX_ZOOM = 20;

const DEFAULT_CENTER = {
  lat: 37.566,
  lng: 126.978,
};

const DEFAULT_ZOOM = 16;

// Center 파서
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

// Bounds 파서
const parseAsBounds = createParser({
  parse: (value) => {
    const parts = (value || '').split(',');
    if (parts.length !== 4) return null;

    const nums = parts.map((p) => parseFloat(p));
    if (nums.some((n) => isNaN(n))) return null;

    return {
      minLat: nums[0]!,
      minLng: nums[1]!,
      maxLat: nums[2]!,
      maxLng: nums[3]!,
    };
  },
  serialize: (value: Bounds) =>
    `${value.minLat},${value.minLng},${value.maxLat},${value.maxLng}`,
});

function clampZoom(zoom: number) {
  return Math.min(Math.max(zoom, MIN_ZOOM), MAX_ZOOM);
}

// 훅 구현
export function useMapState(
  initialState?: Partial<MapState>,
): [MapState, (newState: MapState | ((prev: MapState) => MapState)) => void] {
  // 초기값 설정
  const initialCenter = initialState?.center ?? DEFAULT_CENTER;
  const initialZoom = clampZoom(initialState?.zoom ?? DEFAULT_ZOOM);
  const initialStudioId = initialState?.studioId ?? null;
  const initialBounds = initialState?.bounds ?? null;

  // useQueryState 훅 사용
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

  // Bounds는 withDefault 없이 사용 (null 허용을 위해)
  const [bounds, setBounds] = useQueryState(
    'bounds',
    parseAsBounds.withOptions({ shallow: true }),
  );

  // 초기 로드 시 값 동기화 및 초기 Bounds 주입
  useEffect(() => {
    // 1. URL이 없으면 초기값으로 설정 (Center, Zoom, StudioId는 withDefault가 처리해주지만 명시적 동기화)
    if (!center) setCenter(initialCenter);
    if (!zoom) setZoom(initialZoom);
    if (initialStudioId && !studioId) setStudioId(initialStudioId);

    // 2. [중요] Bounds 초기값이 있고, 현재 URL에 Bounds가 없다면 초기값 주입
    if (initialBounds && !bounds) {
      setBounds(initialBounds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 1회 실행

  // 현재 상태 객체 생성
  const mapValue: MapState = {
    center: center ?? initialCenter,
    zoom: clampZoom(zoom ?? initialZoom),
    studioId: studioId || null,
    bounds: bounds ?? null,
  };

  // 상태 업데이트 함수
  const setMapValue = (newState: MapState | ((prev: MapState) => MapState)) => {
    const state =
      typeof newState === 'function' ? newState(mapValue) : newState;

    // 변경된 값만 업데이트 (최적화)
    if (state.center !== mapValue.center) setCenter(state.center);
    if (state.zoom !== mapValue.zoom) setZoom(clampZoom(state.zoom));
    if (state.studioId !== mapValue.studioId) setStudioId(state.studioId);
    if (state.bounds !== mapValue.bounds) setBounds(state.bounds);
  };

  return [mapValue, setMapValue];
}
