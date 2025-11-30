import { useQuery } from '@tanstack/react-query';

import { getStudioFilterOptions } from '@/lib/studios';

export const useStudiosQueries = () => {
  const studioFilterOptionsQuery = useQuery({
    queryKey: ['studios', 'filter-options'],
    queryFn: getStudioFilterOptions,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  return {
    studioFilterOptionsQuery,
  };
};
