import { useQuery } from '@tanstack/react-query';

import { getMusicianMe } from '@/lib/musician';

const useMusicianMeQuery = () => {
  return useQuery({
    queryKey: ['musician', 'me'],
    queryFn: getMusicianMe,
  });
};

export { useMusicianMeQuery };
