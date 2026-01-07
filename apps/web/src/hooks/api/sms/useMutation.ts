import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { postSmsSendVerification, postSmsVerify } from '@/lib/sms';
import { ApiRequestError } from '@/types/api';
import {
  SmsSendVerificationRequestProps,
  SmsVerifyRequestProps,
} from '@/types/sms';

const useSmsSendVerificationMutation = (): UseMutationResult<
  any,
  ApiRequestError,
  SmsSendVerificationRequestProps
> => {
  return useMutation({
    mutationFn: postSmsSendVerification,
  });
};

const useSmsVerifyMutation = (): UseMutationResult<
  any,
  ApiRequestError,
  SmsVerifyRequestProps
> => {
  return useMutation({
    mutationFn: postSmsVerify,
  });
};

export { useSmsSendVerificationMutation, useSmsVerifyMutation };
