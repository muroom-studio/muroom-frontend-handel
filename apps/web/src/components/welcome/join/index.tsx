'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { useMusiciansRegisterMutation } from '@/hooks/api/musicians/useMutations';
import { useWelcomeMode } from '@/hooks/nuqs/welcome/useWelcomeMode';
import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';
import { useMusicianStore } from '@/store/useMusicianStore';
import { setToken } from '@/utils/cookie';

import { JoinFirstStep, JoinSecondStep } from '../components/steps';
import JoinThirdStep from '../components/steps/third-step';
import DesktopJoinPage from './desktop';
import MobileJoinPage from './mobile';
import { JoinCommonProps } from './types';

interface Props {
  isMobile: boolean;
}

export default function JoinPage({ isMobile }: Props) {
  const { dto } = useMusicianStore();
  const { mutateAsync: registerMutateAsync } = useMusiciansRegisterMutation();

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [isNextValid, setIsNextValid] = useState(false);
  const { toLogin } = useWelcomeMode();
  const { performRedirect } = useAuthRedirectStore();

  useEffect(() => {
    setIsNextValid(false);
  }, [step]);

  const handleBackClick = () => {
    if (step === 0) {
      toLogin();
      return;
    }
    setStep((prev) => (prev - 1) as 0 | 1 | 2);
  };

  const handleNextClick = async () => {
    if (step === 2) {
      const result = await registerMutateAsync(dto);

      const { accessToken, refreshToken } = result;

      if (accessToken && refreshToken) {
        await setToken(accessToken, refreshToken);

        toast.success('회원가입이 완료되었습니다.');
        performRedirect();
      }

      return;
    }
    setStep((prev) => (prev + 1) as 0 | 1 | 2);
  };

  // 스텝별 설정
  const STEP_CONFIG = {
    0: { label: '다음', onClick: handleNextClick },
    1: { label: '다음', onClick: handleNextClick },
    2: { label: '회원가입 완료하기', onClick: handleNextClick },
  };

  const currentConfig = STEP_CONFIG[step];
  const progress = Math.round(((step + 1) / 3) * 100);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <JoinFirstStep onValidChange={(isValid) => setIsNextValid(isValid)} />
        );
      case 1:
        return (
          <JoinSecondStep
            onValidChange={(isValid) => setIsNextValid(isValid)}
          />
        );
      case 2:
        return (
          <JoinThirdStep onValidChange={(isValid) => setIsNextValid(isValid)} />
        );
      default:
        return null;
    }
  };

  const commonProps: JoinCommonProps = {
    step,
    progress,
    isNextValid,
    stepConfig: currentConfig,
    stepContent: renderStepContent(),
    onBackClick: handleBackClick,
  };

  return (
    <main className='h-full'>
      {isMobile ? (
        <MobileJoinPage {...commonProps} />
      ) : (
        <DesktopJoinPage {...commonProps} />
      )}
    </main>
  );
}
