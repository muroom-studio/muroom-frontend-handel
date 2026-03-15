'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSignUpStore } from '../_store/sign-up-store';
import { AuthFormContainer } from '../../_components';

export default function SignUpTermsForm() {
  const router = useRouter();
  const isStepAccessible = useSignUpStore((s) => s.isStepAccessible);

  useEffect(() => {
    if (!isStepAccessible('terms')) {
      router.replace('/sign-up/info');
    }
  }, [isStepAccessible, router]);

  return (
    <AuthFormContainer>
      {/* TODO: 약관 동의 구현 */}
    </AuthFormContainer>
  );
}
