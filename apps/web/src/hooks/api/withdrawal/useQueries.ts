import { useQuery } from '@tanstack/react-query';

import { getWithdrawalReasons } from '@/lib/withdrawal';

const useWithdrawalReasonsQuery = () => {
  return useQuery({
    queryKey: ['withdrawal', 'reasons'],
    queryFn: getWithdrawalReasons,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    select: (data) => {
      const defaultOption = { id: 0, code: '', description: '선택' };
      return [defaultOption, ...data];
    },
  });
};

export { useWithdrawalReasonsQuery };
