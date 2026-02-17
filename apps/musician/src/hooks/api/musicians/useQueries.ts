import { useQuery } from '@tanstack/react-query';

import {
  getMusiciansMe,
  getMusiciansMeDetail,
  getMusiciansNicknameCheck,
  getMusiciansPhoneCheck,
} from '@/lib/musicians';
import {
  MusiciansNicknameCheckRequestProps,
  MusiciansPhoneCheckRequestProps,
} from '@/types/musicians';

const useMusiciansMeQuery = (options: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['musicians', 'me'],
    queryFn: getMusiciansMe,
    enabled: options.enabled,
  });
};

const useMusiciansMeDetailQuery = () => {
  return useQuery({
    queryKey: ['musicians', 'me', 'detail'],
    queryFn: getMusiciansMeDetail,
  });
};

const useMusiciansNicknameCheckQuery = (
  params: MusiciansNicknameCheckRequestProps,
) => {
  return useQuery({
    queryKey: ['musicians', 'nickname', 'check', params.nickname],
    queryFn: () => getMusiciansNicknameCheck(params),
    enabled: false, // refetch로만 동작함
  });
};

const useMusiciansPhoneCheckQuery = (
  params: MusiciansPhoneCheckRequestProps,
) => {
  return useQuery({
    queryKey: ['musicians', 'phone', 'check', params.phone],
    queryFn: () => getMusiciansPhoneCheck(params),
    enabled: false, // refetch로만 동작함
  });
};

export {
  useMusiciansMeQuery,
  useMusiciansMeDetailQuery,
  useMusiciansNicknameCheckQuery,
  useMusiciansPhoneCheckQuery,
};
