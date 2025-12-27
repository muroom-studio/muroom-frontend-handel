import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import {
  getStudioBoasts,
  getStudioBoastsDetail,
  getStudioBoastsMy,
} from '@/lib/studio-boasts';
import {
  StudioBoastsDetailRequestProps,
  StudioBoastsRequestProps,
} from '@/types/studio-boasts';

interface UseStudioBoastsQueryConfig {
  page: number;
  size: number;
  isMobile: boolean;
  isMyList?: boolean;
}

const useStudioBoastsQuery = (
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

const useStudioBoastsDetailQuery = (params: StudioBoastsDetailRequestProps) => {
  return useQuery({
    queryKey: ['studio-boasts', params.studioBoastId],
    queryFn: () => getStudioBoastsDetail(params),
  });
};

export { useStudioBoastsQuery, useStudioBoastsDetailQuery };
