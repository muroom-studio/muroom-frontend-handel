'use client';

import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';

const filterKeys = {
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  minRoomWidth: parseAsInteger,
  maxRoomWidth: parseAsInteger,
  minRoomHeight: parseAsInteger,
  maxRoomHeight: parseAsInteger,
  commonOptionCodes: parseAsArrayOf(parseAsString),
  individualOptionCodes: parseAsArrayOf(parseAsString),
  floorTypes: parseAsArrayOf(parseAsString),
  restroomTypes: parseAsArrayOf(parseAsString),
  isParkingAvailable: parseAsBoolean,
  isLodgingAvailable: parseAsBoolean,
  hasFireInsurance: parseAsBoolean,
  forbiddenInstrumentCodes: parseAsArrayOf(parseAsString),
};

export function useFilters() {
  // 인터페이스 유지: shallow 옵션을 통해 클라이언트 사이드 업데이트만 수행합니다.
  const [filters, setFilters] = useQueryStates(filterKeys, {
    shallow: true,
  });

  const clearFilters = () => {
    // 모든 필터를 한 번에 null로 밀어버려 URL을 깔끔하게 정리합니다.
    setFilters(null);
  };

  return {
    filters,
    setFilters,
    clearFilters,
  };
}
