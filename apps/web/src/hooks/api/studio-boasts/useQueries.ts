import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { getStudioBoasts, getStudioBoastsMy } from '@/lib/studio-boasts';
import { StudioBoastsRequestProps } from '@/types/studio-boasts';

interface UseStudioBoastsQueryConfig {
  page: number;
  size: number;
  isMobile: boolean;
  isMyList?: boolean; // [추가] 내 글 조회 모드 (기본값 false)
}

export const useStudioBoastsQuery = (
  params: Omit<StudioBoastsRequestProps, 'page' | 'size'> | undefined,
  config: UseStudioBoastsQueryConfig,
) => {
  const { isMyList = false, isMobile, page, size } = config;

  return useInfiniteQuery({
    queryKey: [
      'studio-boasts',
      isMyList ? 'my' : 'list',
      params || {},
      isMobile ? 'mobile' : { page, type: 'pc' },
    ],

    queryFn: ({ pageParam }) => {
      const apiParams = {
        ...(params || {}),
        page: pageParam,
        size: size,
      };

      return isMyList
        ? getStudioBoastsMy(apiParams)
        : getStudioBoasts(apiParams);
    },

    initialPageParam: isMobile ? 0 : page - 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.isLast) return undefined;
      return lastPage.pagination.pageNumber + 1;
    },

    placeholderData: keepPreviousData,
  });
};
