import { useQuery } from '@tanstack/react-query';

import { getNicknameCheck } from '@/lib/user';

export const useUserQueries = () => {
  const useUserNicknameCheckQuery = (nickname: string) => {
    return useQuery({
      queryKey: ['user', 'nickname', 'check', nickname],
      queryFn: () => getNicknameCheck(nickname),
      enabled: false, // refetch로만 동작함
    });
  };

  return {
    useUserNicknameCheckQuery,
  };
};
