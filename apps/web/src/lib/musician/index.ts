import {
  MusicianLoginRequestProps,
  MusicianLoginResponseProps,
  MusicianMeDetailRequestDto,
  MusicianMeDetailResponseDto,
  MusicianMeResponseDto,
  MusicianRegisterRequestProps,
  MusicianRegisterResponseProps,
} from '@/types/musician';
import { customFetch } from '@/utils/customFetch';

export const postMusicianLogin = async ({
  provider,
  providerId,
}: MusicianLoginRequestProps) => {
  const responseData = await customFetch<MusicianLoginResponseProps>(
    '/musician/login',
    {
      method: 'POST',
      body: JSON.stringify({ provider, providerId }),
    },
  );

  return responseData;
};

export const postMusicianRegister = async (
  dto: MusicianRegisterRequestProps,
) => {
  const responseData = await customFetch<MusicianRegisterResponseProps>(
    '/musician/register',
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
  );

  return responseData;
};

export const getMusicianMe = async () => {
  const responseData = await customFetch<MusicianMeResponseDto>(
    '/musician/me',
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const getMusicianMeDetail = async () => {
  const responseData = await customFetch<MusicianMeDetailResponseDto>(
    '/musician/me/detail',
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const patchMusicianMeDetail = async (
  dto: MusicianMeDetailRequestDto,
) => {
  const responseData = await customFetch('/musician/me/detail', {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });

  return responseData;
};
