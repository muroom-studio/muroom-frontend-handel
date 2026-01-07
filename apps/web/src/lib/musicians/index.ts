import { createQueryString } from '@muroom/util';

import {
  MusiciansMeDetailRequestProps,
  MusiciansMeDetailResponseProps,
  MusiciansMeResponseProps,
  MusiciansNicknameCheckRequestProps,
  MusiciansNicknameCheckResponseProps,
  MusiciansPhoneCheckRequestProps,
  MusiciansRegisterRequestProps,
  MusiciansRegisterResponseProps,
} from '@/types/musicians';
import { customFetch } from '@/utils/customFetch';

export const getMusiciansMe = async () => {
  const responseData = await customFetch<MusiciansMeResponseProps>(
    '/musicians/me',
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const getMusiciansMeDetail = async () => {
  const responseData = await customFetch<MusiciansMeDetailResponseProps>(
    '/musicians/me/detail',
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const patchMusiciansMeDetail = async (
  dto: MusiciansMeDetailRequestProps,
) => {
  const responseData = await customFetch('/musicians/me/detail', {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });

  return responseData;
};

export const postMusiciansRegister = async (
  dto: MusiciansRegisterRequestProps,
) => {
  const responseData = await customFetch<MusiciansRegisterResponseProps>(
    '/musicians/register',
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
  );

  return responseData;
};

// 회원가입 -> 닉네임 중복검사
export const getMusiciansNicknameCheck = async (
  params: MusiciansNicknameCheckRequestProps,
) => {
  const queryString = createQueryString(params);

  const responseData = await customFetch<MusiciansNicknameCheckResponseProps>(
    `/musicians/nickname/check?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};

// 회원가입 -> 전화번호 중복검사
export const getMusiciansPhoneCheck = async (
  params: MusiciansPhoneCheckRequestProps,
) => {
  const queryString = createQueryString(params);

  const responseData = await customFetch(
    `/musicians/phone/check?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData ?? true;
};
