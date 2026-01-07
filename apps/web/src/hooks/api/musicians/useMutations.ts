import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { patchMusiciansMeDetail, postMusiciansRegister } from '@/lib/musicians';
import { ApiRequestError } from '@/types/api';
import {
  MusiciansMeDetailRequestProps,
  MusiciansRegisterRequestProps,
  MusiciansRegisterResponseProps,
} from '@/types/musicians';

const useMusiciansRegisterMutation = (): UseMutationResult<
  MusiciansRegisterResponseProps,
  ApiRequestError,
  MusiciansRegisterRequestProps
> => {
  return useMutation({
    mutationFn: postMusiciansRegister,
  });
};

const useMusiciansMeDetailMutation = (): UseMutationResult<
  any,
  ApiRequestError,
  MusiciansMeDetailRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: MusiciansMeDetailRequestProps) =>
      patchMusiciansMeDetail(dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['musician', 'me', 'detail'] });

      if (variables.nickname || variables.instrumentId) {
        queryClient.invalidateQueries({ queryKey: ['musician', 'me'] });
      }
    },
  });
};

export { useMusiciansRegisterMutation, useMusiciansMeDetailMutation };
