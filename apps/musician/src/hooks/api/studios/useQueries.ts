import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import {
  getStudioDetail,
  getStudioFilterOptions,
  getStudiosMapList,
  getStudiosMapSearch,
  getStudiosSearchAddress,
} from '@/lib/studios';
import {
  StudiosMapSearchRequestProps,
  StudiosSearchAddressRequestProps,
} from '@/types/studios';

// 1. 필터 옵션 조회 훅
const useStudioFilterOptionsQuery = () => {
  return useQuery({
    queryKey: ['studios', 'filter-options'],
    queryFn: getStudioFilterOptions,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
};

// 2. 지도 마커 검색 훅
const useStudiosMapSearchQuery = (params?: StudiosMapSearchRequestProps) => {
  return useQuery({
    queryKey: ['studios', 'map-search', params],
    queryFn: () => getStudiosMapSearch(params!),
    enabled: !!params,
    placeholderData: keepPreviousData,
  });
};

// 3. 지도 리스트 무한 스크롤 훅
const useStudiosMapListInfiniteQuery = (
  params: StudiosMapSearchRequestProps | undefined,
  config: {
    page: number;
    size: number;
    isMobile: boolean;
  },
) => {
  return useInfiniteQuery({
    queryKey: [
      'studios',
      'map-list',
      params,
      config.isMobile ? 'mobile' : { page: config.page, type: 'pc' },
    ],

    queryFn: ({ pageParam }) => {
      return getStudiosMapList({
        ...params!,
        page: pageParam,
        size: config.size,
      });
    },

    initialPageParam: config.isMobile ? 0 : config.page - 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.isLast) return undefined;
      return lastPage.pagination.pageNumber + 1;
    },

    enabled: !!params,

    placeholderData: keepPreviousData,
  });
};

// 4. 스튜디오 상세 조회 훅
const useStudioDetailQuery = (studioId: string | null | undefined) => {
  return useQuery({
    queryKey: ['studios', studioId],
    queryFn: () => getStudioDetail(studioId!),
    enabled: !!studioId,
    staleTime: 1000 * 60 * 5,
  });
};

// 5. 도로명 주소로 스튜디오 검색
const useStudiosSearchAddressQuery = (
  params: StudiosSearchAddressRequestProps,
) => {
  return useQuery({
    queryKey: ['studios', 'search', 'address', params.roadNameAddress],
    queryFn: () => getStudiosSearchAddress(params),
    enabled: !!params.roadNameAddress,
    select: (data) => {
      if (data && data.length > 0) {
        return [
          ...data,
          {
            id: 'direct-input',
            name: '직접입력',
            roadNameAddress: '',
            lotNumberAddress: '',
            detailedAddress: '',
          },
        ];
      }
      return data;
    },
  });
};

export {
  useStudioFilterOptionsQuery,
  useStudiosMapSearchQuery,
  useStudiosMapListInfiniteQuery,
  useStudioDetailQuery,
  useStudiosSearchAddressQuery,
};
