import { useQuery } from '@tanstack/react-query';

import { getInstruments } from '@/lib/instruments';

const useInstrumentsQuery = () => {
  return useQuery({
    queryKey: ['instruments'],
    queryFn: getInstruments,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
};

export { useInstrumentsQuery };
