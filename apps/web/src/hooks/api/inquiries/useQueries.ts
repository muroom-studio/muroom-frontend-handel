import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import {
  getInquiriesDetail,
  getInquiriesMy,
  getInquiriesSearch,
  getInquiryCategories,
} from '@/lib/inquiries';
import { PageRequestProps } from '@/types/api';
import {
  InquiriesDetailRequestProps,
  InquiriesSearchRequestProps,
} from '@/types/inquiries';

const useInquiryCategories = () => {
  return useQuery({
    queryKey: ['inquiry', 'categories'],
    queryFn: getInquiryCategories,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
};

const useInquiriesListQuery = (
  params: InquiriesSearchRequestProps,
  config: {
    page: number;
    size: number;
    isMobile: boolean;
  },
) => {
  const { keyword } = params;
  const { page, size, isMobile } = config;

  return useInfiniteQuery({
    queryKey: [
      'inquiries',
      keyword ? 'search' : 'my',
      { keyword },
      isMobile ? 'mobile' : { page, type: 'pc' },
    ],

    queryFn: ({ pageParam }) => {
      const commonParams = {
        page: pageParam,
        size: size,
      } as PageRequestProps;

      if (keyword) {
        return getInquiriesSearch({
          ...commonParams,
          keyword: keyword,
        });
      } else {
        return getInquiriesMy(commonParams);
      }
    },

    initialPageParam: isMobile ? 0 : page - 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.isLast) return undefined;
      return lastPage.pagination.pageNumber + 1;
    },

    placeholderData: keepPreviousData,
  });
};

const useInquiriesDetailQuery = (params: InquiriesDetailRequestProps) => {
  return useQuery({
    queryKey: ['inquiries', 'detail', params.inquiryId],
    queryFn: () => getInquiriesDetail(params),
  });
};

export { useInquiryCategories, useInquiriesListQuery, useInquiriesDetailQuery };
