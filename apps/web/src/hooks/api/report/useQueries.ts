import { useQuery } from '@tanstack/react-query';

import { getReportReason } from '@/lib/report';

const useReportReasonQuery = () => {
  return useQuery({
    queryKey: ['report-reason'],
    queryFn: getReportReason,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
};

export { useReportReasonQuery };
