import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getStudioFilterOptions, getStudiosMapSearch } from '@/lib/studios';
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

  return {
    studioFilterOptionsQuery,
    useStudiosMapSearchQuery,
  };
};
