import {
  SmsSendVerificationRequestProps,
  SmsVerifyRequestProps,
} from '@/types/sms';
import { customFetch } from '@/utils/customFetch';

// 회원가입 -> 인증번호 받기
export const postSmsSendVerification = async (
  dto: SmsSendVerificationRequestProps,
) => {
  const responseData = await customFetch('/sms/send-verification', {
    method: 'POST',
    body: JSON.stringify(dto),
  });

  return responseData;
};

// 회원가입 -> 인증번호 검증
export const postSmsVerify = async (dto: SmsVerifyRequestProps) => {
  const responseData = await customFetch('/sms/verify', {
    method: 'POST',
    body: JSON.stringify(dto),
  });

  return responseData;
};
