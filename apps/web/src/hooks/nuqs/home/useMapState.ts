'use client';

// useState 임포트 제거
import {
  useQueryState,
  parseAsInteger,
  createParser,
  parseAsString,
} from 'nuqs';

// [!] MapState 인터페이스 수정: selectedId 제거, studioId 추가
export interface MapState {
  center: { lat: number; lng: number };
  zoom: number;
  studioId: string | null;
}

// 기본값 정의
const DEFAULT_CENTER = {
  lat: 37.566,
  lng: 126.978,
};
const DEFAULT_ZOOM = 15;

/**
 * { lat: number, lng: number } 객체 <-> "lat,lng" 문자열 변환 파서
 */
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

/**
 * 지도 상태(center, zoom, studioId)를 관리하는 훅
 * - 3개의 모든 상태를 URL 쿼리 파라미터와 동기화합니다.
 * @returns [mapValue, setMapValue] (useState와 동일한 API)
 */
export function useMapState(): [
  MapState,
  (newState: MapState | ((prev: MapState) => MapState)) => void,
] {
  // 1. URL과 동기화되는 상태 (nuqs)
  const [center, setCenter] = useQueryState(
    'center',
    parseAsCenter.withDefault(DEFAULT_CENTER),
  );
  const [zoom, setZoom] = useQueryState(
    'zoom',
    parseAsInteger.withDefault(DEFAULT_ZOOM),
  );

  // [!] studioId를 nuqs로 관리
  const [studioId, setStudioId] = useQueryState(
    'studioId',
    parseAsString, // .withDefault() 없이 사용 (string | null)
  );

  // [!] selectedId는 완전히 제거됨

  // 3. CommonMap에 전달할 값들을 조합
  const mapValue: MapState = {
    center: center ?? DEFAULT_CENTER,
    zoom: zoom ?? DEFAULT_ZOOM,
    studioId: studioId, // [!] studioId가 MapState의 일부가 됨
  };

  /**
   * CommonMap에서 호출할 통합 세터 함수
   */
  const setMapValue = (newState: MapState | ((prev: MapState) => MapState)) => {
    const state =
      typeof newState === 'function' ? newState(mapValue) : newState;

    // 3개의 URL 상태를 업데이트합니다.
    setCenter(state.center);
    setZoom(state.zoom);
    setStudioId(state.studioId); // [!] setStudioId를 호출
  };

  // 4. [mapValue, setMapValue] 튜플을 반환합니다.
  return [mapValue, setMapValue];
}
