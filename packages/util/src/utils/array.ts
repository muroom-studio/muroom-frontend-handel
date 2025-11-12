/**
 * 불변성을 유지하면서 배열의 특정 항목을 토글(추가/제거)합니다.
 * @param prevArray - 원본 배열 (이전 상태)
 * @param itemToToggle - 토글할 항목
 * @returns - 토글이 적용된 새 배열
 */
export const toggleItemInArray = <T>(prevArray: T[], itemToToggle: T): T[] => {
  if (prevArray.indexOf(itemToToggle) !== -1) {
    return prevArray.filter((item) => item !== itemToToggle);
  } else {
    return [...prevArray, itemToToggle];
  }
};
