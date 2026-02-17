import { useQuery } from '@tanstack/react-query';

import { getWithdrawalReason } from '@/lib/withdrawal';

const useWithdrawalReasonQuery = () => {
  return useQuery({
    queryKey: ['withdrawal', 'reasons'],
    queryFn: getWithdrawalReason,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    select: (data) => {
      const defaultOption = { id: 0, code: '', description: '선택' };
      return [defaultOption, ...data];
    },
  });
};

export { useWithdrawalReasonQuery };
