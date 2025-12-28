import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import {
  getStudioBoasts,
  getStudioBoastsDetail,
  getStudioBoastsMy,
  getStudioBoastsSimple,
} from '@/lib/studio-boasts';
import {
  StudioBoastsDetailRequestProps,
  StudioBoastsRequestProps,
  StudioBoastsSimpleRequestProps,
  StudioBoastsSimpleResponseProps,
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

const useStudioBoastsSimpleQuery = (
  params: Omit<StudioBoastsSimpleRequestProps, 'page' | 'size'>,
  config?: { size?: number },
) => {
  const { sort } = params;
  const size = config?.size || 12;

  return useInfiniteQuery<
    StudioBoastsSimpleResponseProps, // 1. TQueryFnData: 쿼리 함수(API)가 반환하는 1개 페이지 데이터 타입
    Error, // 2. TError: 에러 타입
    InfiniteData<StudioBoastsSimpleResponseProps>, // 3. TData: 훅이 최종적으로 반환하는 데이터 구조 (pages 배열이 포함된 타입)
    readonly ['studio-boasts', 'simple', typeof sort], // 4. TQueryKey: 쿼리 키 타입
    number // 5. TPageParam: pageParam의 타입
  >({
    queryKey: ['studio-boasts', 'simple', sort],

    queryFn: ({ pageParam }) =>
      getStudioBoastsSimple({
        page: pageParam,
        size,
        sort,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.isLast) return undefined;
      return lastPage.pagination.pageNumber + 1;
    },
  });
};

const useStudioBoastsDetailQuery = (params: StudioBoastsDetailRequestProps) => {
  return useQuery({
    queryKey: ['studio-boasts', params.studioBoastId],
    queryFn: () => getStudioBoastsDetail(params),
  });
};

export {
  useStudioBoastsQuery,
  useStudioBoastsDetailQuery,
  useStudioBoastsSimpleQuery,
};
