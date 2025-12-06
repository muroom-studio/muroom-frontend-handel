import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { postMusicianLogin, postMusicianRegister } from '@/lib/musician';
import {
  MusicianLoginRequestProps,
  MusicianLoginResponseProps,
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

export { useMusicianLoginMutation, useMusicianRegisterMutation };
