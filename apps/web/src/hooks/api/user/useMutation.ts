import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { postSmsAuth, postSmsVerify } from '@/lib/user';
import {
  UserSmsAuthRequestProps,
  UserSmsVerifyRequestProps,
} from '@/types/user';

const useUserSmsAuthMutation = (): UseMutationResult<
  any,
  Error,
  UserSmsAuthRequestProps
> => {
  return useMutation({
    mutationFn: postSmsAuth,
  });
};

const useUserSmsVerifyMutation = (): UseMutationResult<
  any,
  Error,
  UserSmsVerifyRequestProps
> => {
  return useMutation({
    mutationFn: postSmsVerify,
    meta: {
      ignoreErrorToast: true,
    },
  });
};

export { useUserSmsAuthMutation, useUserSmsVerifyMutation };
