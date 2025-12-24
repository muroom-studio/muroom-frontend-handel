import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import { getInquiriesMy, getInquiryCategories } from '@/lib/inquiries';
import { PageRequestProps } from '@/types/api';

const useInquiryCategories = () => {
  return useQuery({
    queryKey: ['inquiry', 'categories'],
    queryFn: getInquiryCategories,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
};

const useInquiriesMyQuery = (config: {
  page: number;
  size: number;
  isMobile: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: [
      'inquiries',
      'my',
      config.isMobile ? 'mobile' : { page: config.page, type: 'pc' },
    ],

    queryFn: ({ pageParam }) => {
      return getInquiriesMy({
        page: pageParam,
        size: config.size,
      } as PageRequestProps);
    },

    initialPageParam: config.isMobile ? 0 : config.page - 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.isLast) return undefined;
      return lastPage.pagination.pageNumber + 1;
    },
    placeholderData: keepPreviousData,
  });
};

export { useInquiryCategories, useInquiriesMyQuery };
