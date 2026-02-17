import { useQuery } from '@tanstack/react-query';

import { getReportReasons } from '@/lib/report';

const useReportReasonsQuery = () => {
  return useQuery({
    queryKey: ['report-reasons'],
    queryFn: getReportReasons,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
};

export { useReportReasonsQuery };
