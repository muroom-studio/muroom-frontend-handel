/**
 * 불변성을 유지하면서 배열에 특정 항목을 토글(없으면 추가, 있으면 제거)하여 업데이트합니다.
 * @param prevArray - 원본 배열 (이전 상태)
 * @param itemToToggle - 토글할 항목
 * @returns - 업데이트된 새 배열
 */
export const updateArrayByToggle = <T>(
  prevArray: T[],
  itemToToggle: T,
): T[] => {
  if (prevArray.includes(itemToToggle)) {
    // 이미 있으면 제거 (Filter)
    return prevArray.filter((item) => item !== itemToToggle);
  } else {
    // 없으면 추가 (Spread)
    return [...prevArray, itemToToggle];
  }
};
