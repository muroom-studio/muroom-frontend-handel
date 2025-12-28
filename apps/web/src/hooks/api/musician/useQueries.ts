import { useQuery } from '@tanstack/react-query';

import { getMusicianMe, getMusicianMeDetail } from '@/lib/musician';

const useMusicianMeQuery = () => {
  return useQuery({
    queryKey: ['musician', 'me'],
    queryFn: getMusicianMe,
  });
};

const useMusicianMeDetailQuery = () => {
  return useQuery({
    queryKey: ['musician', 'me', 'detail'],
    queryFn: getMusicianMeDetail,
  });
};

export { useMusicianMeQuery, useMusicianMeDetailQuery };
