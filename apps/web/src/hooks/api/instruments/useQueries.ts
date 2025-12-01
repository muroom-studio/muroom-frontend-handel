import { useQuery } from '@tanstack/react-query';

import { getInstruments } from '@/lib/instruments';

export const useInstrumentsQueries = () => {
  const instrumentsQuery = useQuery({
    queryKey: ['instruments'],
    queryFn: getInstruments,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  return {
    instrumentsQuery,
  };
};
