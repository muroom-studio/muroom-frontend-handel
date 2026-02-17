import {
  WithdrawalMusicianRequestProps,
  WithdrawalReasonResponseProps,
} from '@/types/withdrawal';
import { customFetch } from '@/utils/customFetch';

export const getWithdrawalReason = async () => {
  const responseData = await customFetch<WithdrawalReasonResponseProps>(
    '/withdrawal-reasons',
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const postWithdrawalMusician = async (
  dto: WithdrawalMusicianRequestProps,
) => {
  const responseData = await customFetch('/withdrawal/musician', {
    method: 'POST',
    body: JSON.stringify(dto),
  });

  return responseData;
};
