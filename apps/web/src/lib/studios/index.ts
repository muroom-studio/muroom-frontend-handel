import { StudioFilterOptionsResponseProps } from '@/types/studios';
import { customFetch } from '@/utils/customFetch';

export const getStudioFilterOptions = async () => {
  const responseData = await customFetch<StudioFilterOptionsResponseProps>(
    '/studios/filter-options',
    {
      method: 'GET',
    },
  );

  return responseData;
};
