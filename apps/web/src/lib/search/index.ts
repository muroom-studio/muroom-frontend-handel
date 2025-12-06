import { SearchHistoryItem } from '@/types/search';
import { customFetch } from '@/utils/customFetch';

export const getRecent = async () => {
  const responseData = await customFetch<SearchHistoryItem[]>(
    '/search/recent',
    {
      method: 'GET',
    },
  );
  return responseData;
};
