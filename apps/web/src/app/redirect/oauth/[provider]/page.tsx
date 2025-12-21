'use client';

import { useEffect, useRef } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import Loading from '@/app/loading';
import { useMusicianLoginMutation } from '@/hooks/api/musician/useMutations';
import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';
import { useMusicianStore } from '@/store/useMusicianStore';
import { setToken } from '@/utils/cookie';

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { mutateAsync: loginMutateAsync } = useMusicianLoginMutation();

  const isProcessing = useRef(false);

  const provider = params.provider as string;
  const code = searchParams.get('code');

  const { performRedirect } = useAuthRedirectStore();
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
        console.log(result, '이것만 보자');

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

          router.replace(`/welcome?join=true`);
          return;
        }
      } catch (error) {
        // 일단은 에러처리는 안함
      }
    };

    handleLogin();
  }, [code, provider, router, loginMutateAsync]);

  return <Loading />;
}
