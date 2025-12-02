import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { postMusicianLogin, postMusicianRegister } from '@/lib/musician';
import {
  MusicianLoginRequestProps,
  MusicianLoginResponseProps,
  MusicianRegisterRequestProps,
  MusicianRegisterResponseProps,
} from '@/types/musician';

export const useMusicianMutation = () => {
  const musicianLoginMutation: UseMutationResult<
    MusicianLoginResponseProps,
    Error,
    MusicianLoginRequestProps
  > = useMutation({
    mutationFn: postMusicianLogin,
  });

  const musicianRegisterMutation: UseMutationResult<
    MusicianRegisterResponseProps,
    Error,
    MusicianRegisterRequestProps
  > = useMutation({
    mutationFn: postMusicianRegister,
  });

  return { musicianLoginMutation, musicianRegisterMutation };
};
