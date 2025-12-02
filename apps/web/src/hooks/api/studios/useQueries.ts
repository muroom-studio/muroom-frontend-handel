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
} from '@/lib/studios';
import { StudiosMapSearchRequestProps } from '@/types/studios';

export const useStudiosQueries = () => {
  const studioFilterOptionsQuery = useQuery({
    queryKey: ['studios', 'filter-options'],
    queryFn: getStudioFilterOptions,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const useStudiosMapSearchQuery = (params?: StudiosMapSearchRequestProps) =>
    useQuery({
      queryKey: ['studios', 'map-search', params],
      queryFn: () => getStudiosMapSearch(params!),
      enabled: !!params,
      placeholderData: keepPreviousData,
    });

  const useStudiosMapListInfiniteQuery = (
    params: StudiosMapSearchRequestProps | undefined, // 필터 조건 (page, size 제외)
    config: {
      page: number; // 현재 페이지 번호 (UI 기준 1부터 시작 가정)
      size: number; // 페이지 당 개수
      isMobile: boolean; // 모바일 여부
    },
  ) =>
    useInfiniteQuery({
      queryKey: [
        'studios',
        'map-list',
        params,
        config.isMobile ? 'mobile' : { page: config.page, type: 'pc' },
      ],

      queryFn: ({ pageParam }) => {
        // params가 undefined일 경우 enabled에서 막히지만, 타입 가드를 위해 ! 사용
        return getStudiosMapList({
          ...params!,
          page: pageParam,
          size: config.size,
        });
      },

      // 초기 페이지 설정
      // Mobile: 0부터 시작
      // PC: UI에서 누른 페이지(1-based)를 API(0-based)로 변환하여 시작점으로 설정
      initialPageParam: config.isMobile ? 0 : config.page - 1,

      // 다음 페이지 계산 (Mobile 무한스크롤용)
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.isLast) return undefined;
        return lastPage.pagination.pageNumber + 1;
      },

      enabled: !!params,

      // PC 페이지네이션 시 화면 깜빡임 방지 (이전 데이터 유지하며 로딩)
      placeholderData: keepPreviousData,
    });

  const useStudiosDetailQuery = (studioId: string | null | undefined) =>
    useQuery({
      queryKey: ['studios', studioId],
      queryFn: () => getStudioDetail(studioId!),
      enabled: !!studioId,
      staleTime: 1000 * 60 * 5,
    });

  return {
    studioFilterOptionsQuery,
    useStudiosMapSearchQuery,
    useStudiosMapListInfiniteQuery,
    useStudiosDetailQuery,
  };
};
