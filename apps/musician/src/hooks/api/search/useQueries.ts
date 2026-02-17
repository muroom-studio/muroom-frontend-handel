import { useQuery } from '@tanstack/react-query';

import { getRecent } from '@/lib/search';

const useSearchRecentQuery = () => {
  return useQuery({
    queryKey: ['search', 'recent'],
    queryFn: () => getRecent(),
  });
};

export { useSearchRecentQuery };
