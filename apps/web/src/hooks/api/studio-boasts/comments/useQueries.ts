import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { getStudioBoastsComments } from '@/lib/studio-boasts/comments';
import {
  StudioBoastsCommentsRequestProps,
  StudioBoastsCommentsResponseProps,
} from '@/types/studio-boasts/comments';

interface UseStudioBoastsCommentQueryConfig {
  page: number;
  size: number;
  isMobile?: boolean;
}

const useStudioBoastsCommentsQuery = (
  params: Omit<StudioBoastsCommentsRequestProps, 'page' | 'size'>,
  config: UseStudioBoastsCommentQueryConfig,
) => {
  const { isMobile = false, page, size } = config;
  const { studioBoastId } = params;

  return useInfiniteQuery<
    StudioBoastsCommentsResponseProps,
    Error,
    StudioBoastsCommentsRequestProps,
    readonly [
      string,
      string,
      { page?: number; size?: number; type: string } | string,
    ]
  >({
    queryKey: [
      'studio-boasts-comments',
      studioBoastId,
      isMobile ? 'mobile' : { page, size, type: 'pc' },
    ],

    queryFn: ({ pageParam }) => {
      return getStudioBoastsComments({
        ...params,
        page: pageParam as number,
        size: size,
      });
    },

    initialPageParam: isMobile ? 0 : page - 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.isLast) return undefined;
      return lastPage.pagination.pageNumber + 1;
    },

    placeholderData: keepPreviousData,
  });
};

export { useStudioBoastsCommentsQuery };
