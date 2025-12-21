import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import { getFaqCategories, getFaqs } from '@/lib/faqs';
import { FaqRequestProps } from '@/types/faqs';

const useFaqCategoriesQuery = () => {
  return useQuery({
    queryKey: ['faq', 'categories'],
    queryFn: getFaqCategories,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    select: (data) => {
      const defaultOption = { id: 0, code: '', name: '전체' };
      return [defaultOption, ...data];
    },
  });
};

const useFaqsQuery = (
  params: FaqRequestProps,
  config: {
    page: number;
    size: number;
    isMobile: boolean;
  },
) => {
  return useInfiniteQuery({
    queryKey: [
      'faqs',
      params,
      config.isMobile ? 'mobile' : { page: config.page, type: 'pc' },
    ],

    queryFn: ({ pageParam }) => {
      return getFaqs({
        ...params,
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

export { useFaqCategoriesQuery, useFaqsQuery };
