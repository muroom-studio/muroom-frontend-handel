'use client';

import { useEffect, useRef } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import Loading from '@/app/loading';
import { useAuthMusicianLoginMutation } from '@/hooks/api/auth/musician/useMutations';
import { useThrowError } from '@/hooks/common/useThrowError';
import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';
import { useMusicianStore } from '@/store/useMusicianStore';
import { setToken } from '@/utils/cookie';

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const throwError = useThrowError();

  const { mutateAsync: loginMutateAsync } = useAuthMusicianLoginMutation();
  const isProcessing = useRef(false);

  const provider = params.provider as string;
  const code = searchParams.get('code');

  const { performRedirect, clearRedirectUrl } = useAuthRedirectStore();
  const { setRegisterDTO } = useMusicianStore();

  useEffect(() => {
    if (!code || !provider || isProcessing.current) return;

    isProcessing.current = true;

    const handleLogin = async () => {
      try {
        const result = await loginMutateAsync({
          provider: provider,
          providerId: code,
        });

        const { type, accessToken, refreshToken, signupToken } = result;

        if (type === 'LOGIN' && accessToken && refreshToken) {
          await setToken(accessToken, refreshToken);
          toast.success('로그인이 완료되었습니다.');

          performRedirect();
          return;
        } else if (type === 'SIGNUP_REQUIRED' && signupToken) {
          setRegisterDTO({
            signupToken: result.signupToken,
          });

          const currentRedirectUrl =
            useAuthRedirectStore.getState().redirectUrl;

          const returnTarget = currentRedirectUrl || '/home';
          const separator = returnTarget.includes('?') ? '&' : '?';

          router.replace(`${returnTarget}${separator}trigger_join=true`);
          return;
        }
      } catch (error) {
        throwError(error);
        isProcessing.current = false;
      }
    };

    handleLogin();
  }, [
    code,
    provider,
    router,
    loginMutateAsync,
    performRedirect,
    setRegisterDTO,
    throwError,
    clearRedirectUrl,
  ]);

  return <Loading />;
}
