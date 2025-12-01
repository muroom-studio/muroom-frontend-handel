'use client';

import { useEffect, useState } from 'react';

import { useWelcomeMode } from '@/hooks/nuqs/welcome/useWelcomeMode';

import { JoinFirstStep, JoinSecondStep } from '../components/steps';
import JoinThirdStep from '../components/steps/third-step';
import DesktopJoinPage from './desktop';
import MobileJoinPage from './mobile';
import { JoinCommonProps } from './types';

interface Props {
  isMobile: boolean;
}

export default function JoinPage({ isMobile }: Props) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [isNextValid, setIsNextValid] = useState(false);
  const { toLogin } = useWelcomeMode();

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

  const handleNextClick = () => {
    if (step === 2) {
      console.log('회원가입 완료 로직 호출');
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
