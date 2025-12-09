'use client';

import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';

const filterKeys = {
  // e1 필터
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,

  // e2 필터
  minRoomWidth: parseAsInteger,
  maxRoomWidth: parseAsInteger,
  minRoomHeight: parseAsInteger,
  maxRoomHeight: parseAsInteger,

  // e3 필터
  commonOptionCodes: parseAsArrayOf(parseAsString), // 공용 옵션 (배열)
  individualOptionCodes: parseAsArrayOf(parseAsString), // 개인 옵션 (배열)

  // e4 필터
  floorTypes: parseAsArrayOf(parseAsString), // 층수 (지상/지하)
  restroomTypes: parseAsArrayOf(parseAsString), // 화장실
  isParkingAvailable: parseAsBoolean, // 주차 가능 여부
  isLodgingAvailable: parseAsBoolean, // 숙식 가능 여부
  hasFireInsurance: parseAsBoolean, // 화재 보험 여부

  // e5 필터
  forbiddenInstrumentCodes: parseAsArrayOf(parseAsString), // 금지 악기 (배열)

  // 최신순, 리뷰순, ...
  sort: parseAsString,
};

export function useFilters() {
  const [filters, setFilters] = useQueryStates(filterKeys);

  const clearFilters = () => {
    setFilters({
      minPrice: null,
      maxPrice: null,
      minRoomWidth: null,
      maxRoomWidth: null,
      minRoomHeight: null,
      maxRoomHeight: null,
      commonOptionCodes: null,
      individualOptionCodes: null,
      floorTypes: null,
      restroomTypes: null,
      isParkingAvailable: null,
      isLodgingAvailable: null,
      hasFireInsurance: null,
      forbiddenInstrumentCodes: null,
      sort: null,
    });
  };

  return {
    filters,
    setFilters,
    clearFilters,
  };
}
