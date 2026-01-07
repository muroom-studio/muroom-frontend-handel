import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { postAuthMusicianLogin } from '@/lib/auth/musician';
import { ApiRequestError } from '@/types/api';
import {
  AuthMusicianLoginRequestProps,
  AuthMusicianLoginResponseProps,
} from '@/types/auth/musician';

const useAuthMusicianLoginMutation = (): UseMutationResult<
  AuthMusicianLoginResponseProps,
  ApiRequestError,
  AuthMusicianLoginRequestProps
> => {
  return useMutation({
    mutationFn: postAuthMusicianLogin,
  });
};

export { useAuthMusicianLoginMutation };
