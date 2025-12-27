import { useEffect, useState } from 'react';

/**
 * 값을 지정된 시간(delay)만큼 지연시켜 반환하는 훅
 * @param value 감시할 값
 * @param delay 지연 시간 (ms)
 * @returns 디바운스된 값
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay 시간이 지난 후 값을 업데이트
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // delay 시간 전에 value가 바뀌거나 컴포넌트가 언마운트되면 타이머 취소
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
