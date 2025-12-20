import { useQuery } from '@tanstack/react-query';

import { getNicknameCheck } from '@/lib/user';
import { UserNicknameCheckRequestProps } from '@/types/user';

const useUserNicknameCheckQuery = (params: UserNicknameCheckRequestProps) => {
  return useQuery({
    queryKey: ['user', 'nickname', 'check', params.nickname],
    queryFn: () => getNicknameCheck(params),
    enabled: false, // refetch로만 동작함
  });
};

export { useUserNicknameCheckQuery };
