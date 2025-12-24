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
import {
  MusicianLoginRequestProps,
  MusicianLoginResponseProps,
  MusicianMeDetailRequestDto,
  MusicianRegisterRequestProps,
  MusicianRegisterResponseProps,
} from '@/types/musician';

const useMusicianLoginMutation = (): UseMutationResult<
  MusicianLoginResponseProps,
  Error,
  MusicianLoginRequestProps
> => {
  return useMutation({
    mutationFn: postMusicianLogin,
  });
};

const useMusicianRegisterMutation = (): UseMutationResult<
  MusicianRegisterResponseProps,
  Error,
  MusicianRegisterRequestProps
> => {
  return useMutation({
    mutationFn: postMusicianRegister,
  });
};

const useMusicianMeDetailMutation = (): UseMutationResult<
  any,
  Error,
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

    onError: (error) => {
      console.error('프로필 수정 실패:', error);
    },
  });
};

export {
  useMusicianLoginMutation,
  useMusicianRegisterMutation,
  useMusicianMeDetailMutation,
};
