'use client';

import { useEffect, useRef } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // React 18+ strict mode에서 두 번 실행 방지용 (선택 사항)
  const isProcessing = useRef(false);

  const provider = params.provider as string;

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code || !provider || isProcessing.current) return;

    isProcessing.current = true; // 처리 시작 플래그

    console.log(code, 'code', provider, 'provider');

    // const handleLogin = async () => {
    //   try {
    //     console.log(`로그인 시도: ${provider}, 코드: ${code}`);

    //     // 2. 백엔드 API 호출
    //     // provider에 따라 다른 API를 호출하거나, 하나의 통합 API로 provider를 함께 보냄
    //     // const response = await postLogin({ provider, code });

    //     // 3. 로그인 성공 후 처리 (예: 토큰 저장, 메인 이동)
    //     // localStorage.setItem('accessToken', response.token);
    //     router.replace('/');

    //   } catch (error) {
    //     console.error('로그인 실패', error);
    //     alert('로그인에 실패했습니다.');
    //     router.replace('/login');
    //   }
    // };

    // handleLogin();
  }, [code, provider, router]);

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div>로그인 처리 중입니다... ({provider})</div>
      {/* 여기에 로딩 스피너 컴포넌트를 넣으면 좋습니다 */}
    </div>
  );
}
