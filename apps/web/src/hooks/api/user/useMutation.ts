import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { postSmsAuth, postSmsVerify } from '@/lib/user';
import { ApiRequestError } from '@/types/api';
import {
  UserSmsAuthRequestProps,
  UserSmsVerifyRequestProps,
} from '@/types/user';

const useUserSmsAuthMutation = (): UseMutationResult<
  any,
  ApiRequestError,
  UserSmsAuthRequestProps
> => {
  return useMutation({
    mutationFn: postSmsAuth,
  });
};

const useUserSmsVerifyMutation = (): UseMutationResult<
  any,
  ApiRequestError,
  UserSmsVerifyRequestProps
> => {
  return useMutation({
    mutationFn: postSmsVerify,
  });
};

export { useUserSmsAuthMutation, useUserSmsVerifyMutation };
