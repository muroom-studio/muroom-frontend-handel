/**
 * 불변성을 유지하면서 객체의 특정 속성 값을 업데이트합니다.
 * @param prevObject - 원본 객체 (이전 상태)
 * @param key - 업데이트할 속성의 키
 * @param value - 해당 속성에 넣을 새로운 값
 * @returns - 업데이트된 새 객체
 */
export const updateObjectProperty = <T, K extends keyof T>(
  prevObject: T,
  key: K,
  value: T[K],
): T => {
  return {
    ...prevObject,
    [key]: value,
  };
};
