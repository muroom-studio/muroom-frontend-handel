import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { getStudioBoasts } from '@/lib/studio-boasts';
import { StudioBoastsRequestProps } from '@/types/studio-boasts';

export const useStudioBoastsQuery = (
  params: Omit<StudioBoastsRequestProps, 'page' | 'size'> | undefined,
  config: {
    page: number;
    size: number;
    isMobile: boolean;
  },
) => {
  return useInfiniteQuery({
    queryKey: [
      'studio-boasts',
      params || {},
      config.isMobile ? 'mobile' : { page: config.page, type: 'pc' },
    ],

    queryFn: ({ pageParam }) => {
      return getStudioBoasts({
        ...(params || {}),
        page: pageParam,
        size: config.size,
      });
    },

    initialPageParam: config.isMobile ? 0 : config.page - 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.isLast) return undefined;
      return lastPage.pagination.pageNumber + 1;
    },
    placeholderData: keepPreviousData,
  });
};
