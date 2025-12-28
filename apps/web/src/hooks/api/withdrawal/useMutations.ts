import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { postWithdrawalMusicians } from '@/lib/withdrawal';
import { WithdrawalMusiciansRequestProps } from '@/types/withdrawal';

const useWithdrawalMusiciansMutation = (): UseMutationResult<
  any,
  Error,
  WithdrawalMusiciansRequestProps
> => {
  return useMutation({
    mutationFn: postWithdrawalMusicians,
  });
};

export { useWithdrawalMusiciansMutation };
