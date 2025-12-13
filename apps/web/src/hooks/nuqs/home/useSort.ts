// hooks/nuqs/common/useSort.ts (새로 생성)
import { parseAsString, useQueryState } from 'nuqs';

export function useSort() {
  const [sort, setSort] = useQueryState('sort', parseAsString);

  return {
    sort,
    setSort,
  };
}
