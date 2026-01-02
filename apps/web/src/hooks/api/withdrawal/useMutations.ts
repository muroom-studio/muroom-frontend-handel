import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { postWithdrawalMusicians } from '@/lib/withdrawal';
import { ApiRequestError } from '@/types/api';
import { WithdrawalMusiciansRequestProps } from '@/types/withdrawal';

const useWithdrawalMusiciansMutation = (): UseMutationResult<
  any,
  ApiRequestError,
  WithdrawalMusiciansRequestProps
> => {
  return useMutation({
    mutationFn: postWithdrawalMusicians,
  });
};

export { useWithdrawalMusiciansMutation };
