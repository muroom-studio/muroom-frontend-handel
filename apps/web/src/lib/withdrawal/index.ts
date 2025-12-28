import {
  WithdrawalMusiciansRequestProps,
  WithdrawalReasonsResponseProps,
} from '@/types/withdrawal';
import { customFetch } from '@/utils/customFetch';

export const getWithdrawalReasons = async () => {
  const responseData = await customFetch<WithdrawalReasonsResponseProps>(
    '/withdrawal/reasons',
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const postWithdrawalMusicians = async (
  dto: WithdrawalMusiciansRequestProps,
) => {
  const responseData = await customFetch('/withdrawal/musicians', {
    method: 'POST',
    body: JSON.stringify(dto),
  });

  return responseData;
};
