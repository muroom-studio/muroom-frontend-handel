import {
  UserNicknameCheckRequestProps,
  UserSmsAuthRequestProps,
  UserSmsVerifyRequestProps,
  UserSmsVerifyResponseProps,
} from '@/types/user';
import { customFetch } from '@/utils/customFetch';

// 회원가입 -> 닉네임 중복검사
export const getNicknameCheck = async ({
  nickname,
}: UserNicknameCheckRequestProps) => {
  const queryString = new URLSearchParams({ nickname }).toString();

  const responseData = await customFetch<{ available: boolean }>(
    `/user/nickname/check?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};

// 회원가입 -> 인증번호 받기
export const postSmsAuth = async (dto: UserSmsAuthRequestProps) => {
  const responseData = await customFetch('/user/sms/auth', {
    method: 'POST',
    body: JSON.stringify(dto),
  });

  return responseData;
};

// 회원가입 -> 인증번호 확인
export const postSmsVerify = async (dto: UserSmsVerifyRequestProps) => {
  const responseData = await customFetch<UserSmsVerifyResponseProps>(
    '/user/sms/verify',
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
  );

  return responseData;
};
