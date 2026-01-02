import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  patchMusicianMeDetail,
  postMusicianLogin,
  postMusicianRegister,
} from '@/lib/musician';
import { ApiRequestError } from '@/types/api';
import {
  MusicianLoginRequestProps,
  MusicianLoginResponseProps,
  MusicianMeDetailRequestDto,
  MusicianRegisterRequestProps,
  MusicianRegisterResponseProps,
} from '@/types/musician';

const useMusicianLoginMutation = (): UseMutationResult<
  MusicianLoginResponseProps,
  ApiRequestError,
  MusicianLoginRequestProps
> => {
  return useMutation({
    mutationFn: postMusicianLogin,
  });
};

const useMusicianRegisterMutation = (): UseMutationResult<
  MusicianRegisterResponseProps,
  ApiRequestError,
  MusicianRegisterRequestProps
> => {
  return useMutation({
    mutationFn: postMusicianRegister,
  });
};

const useMusicianMeDetailMutation = (): UseMutationResult<
  any,
  ApiRequestError,
  MusicianMeDetailRequestDto
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: MusicianMeDetailRequestDto) => patchMusicianMeDetail(dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['musician', 'me', 'detail'] });

      if (variables.nickname || variables.instrumentId) {
        queryClient.invalidateQueries({ queryKey: ['musician', 'me'] });
      }
    },
  });
};

export {
  useMusicianLoginMutation,
  useMusicianRegisterMutation,
  useMusicianMeDetailMutation,
};
