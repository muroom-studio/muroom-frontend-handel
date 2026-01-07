import {
  AuthMusicianLoginRequestProps,
  AuthMusicianLoginResponseProps,
} from '@/types/auth/musician';
import { customFetch } from '@/utils/customFetch';

export const postAuthMusicianLogin = async ({
  provider,
  providerId,
}: AuthMusicianLoginRequestProps) => {
  const responseData = await customFetch<AuthMusicianLoginResponseProps>(
    '/auth/musician/login',
    {
      method: 'POST',
      body: JSON.stringify({ provider, providerId }),
    },
  );

  return responseData;
};
