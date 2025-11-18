'use client';

import { Variant as FilterVariant } from '@/components/home/components/filter-item';
import { useQueryStates, parseAsString } from 'nuqs';

// 관리할 필터 키와 기본값 정의
const filterKeys = {
  e1: parseAsString.withDefault(''),
  e2: parseAsString.withDefault(''),
  e3: parseAsString.withDefault(''),
  e4: parseAsString.withDefault(''),
  e5: parseAsString.withDefault(''),
};

/**
 * 홈 화면의 필터 상태(e1~e5)를 nuqs로 관리하는 훅
 */
export function useFilters() {
  const [filteredValue, setFilteredValue] = useQueryStates(filterKeys);

  /**
   * 특정 필터 키(variant)의 값만 업데이트하는 세터 함수
   */
  const setFilter = (key: FilterVariant, value: string) => {
    // 함수형 업데이트를 사용해 특정 키만 변경
    setFilteredValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * 모든 필터를 초기화하는 함수
   */
  const clearFilters = () => {
    // 모든 값을 기본값(빈 문자열)으로 설정
    setFilteredValue({
      e1: '',
      e2: '',
      e3: '',
      e4: '',
      e5: '',
    });
  };

  return {
    /** 현재 필터 값 객체 (e.g., { e1: '', e2: '...' }) */
    filteredValue,
    /** 특정 필터 값을 설정하는 함수 */
    setFilter,
    /** 모든 필터를 초기화하는 함수 */
    clearFilters,
  };
}
