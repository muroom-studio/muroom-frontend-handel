import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { postWithdrawalMusician } from '@/lib/withdrawal';
import { ApiRequestError } from '@/types/api';
import { WithdrawalMusicianRequestProps } from '@/types/withdrawal';

const useWithdrawalMusicianMutation = (): UseMutationResult<
  any,
  ApiRequestError,
  WithdrawalMusicianRequestProps
> => {
  return useMutation({
    mutationFn: postWithdrawalMusician,
  });
};

export { useWithdrawalMusicianMutation };
