'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { AuthFormContainer } from '../../_components';
import { useSignUpStore } from '../_store/sign-up-store';

export default function SignUpVerifyForm() {
  const router = useRouter();
  const isStepAccessible = useSignUpStore((s) => s.isStepAccessible);

  useEffect(() => {
    if (!isStepAccessible('verify')) {
      router.replace('/sign-up/info');
    }
  }, [isStepAccessible, router]);

  return <AuthFormContainer>{/* TODO: 본인 인증 구현 */}</AuthFormContainer>;
}
