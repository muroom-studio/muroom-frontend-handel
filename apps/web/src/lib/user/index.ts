import { customFetch } from '@/utils/customFetch';

export const getNicknameCheck = async (nickname: string) => {
  const queryString = new URLSearchParams({ nickname }).toString();

  const responseData = await customFetch<{ available: boolean }>(
    `/user/nickname/check?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};
