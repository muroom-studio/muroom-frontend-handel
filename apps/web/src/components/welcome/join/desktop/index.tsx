'use client';

import { useEffect, useState } from 'react';

import { Button, Progressbar } from '@muroom/components';

import { useWelcomeMode } from '@/hooks/nuqs/welcome/useWelcomeMode';

import WelcomeHeader from '../../components/header';
import { JoinFirstStep, JoinSecondStep } from '../../components/steps';
import JoinThirdStep from '../../components/steps/third-step';

interface Props {
  step: 0 | 1 | 2;
  setStep: React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
}

export default function DesktopJoinPage({ step, setStep }: Props) {
  const { toLogin } = useWelcomeMode();

  const [isNextValid, setIsNextValid] = useState(false);

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
      console.log('회원가입 로직 넣기');
      return;
    }
    setStep((prev) => (prev + 1) as 0 | 1 | 2);
  };

  const STEP_CONFIG = {
    0: {
      label: '다음',
      onClick: handleNextClick,
    },
    1: {
      label: '다음',
      onClick: handleNextClick,
    },
    2: {
      label: '뮤룸 파트너 시작하기',
      onClick: handleNextClick,
    },
  };

  const currentConfig = STEP_CONFIG[step];
  const progress = Math.round(((step + 1) / 3) * 100);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <JoinFirstStep
            onValidChange={(isValid) => setIsNextValid(!isValid)}
          />
        );
      case 1:
        return (
          <JoinSecondStep
            onValidChange={(isValid) => setIsNextValid(!isValid)}
          />
        );
      case 2:
        return (
          <JoinThirdStep
            onValidChange={(isValid) => setIsNextValid(!isValid)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <WelcomeHeader backClickHandler={handleBackClick} />

      <Progressbar progress={progress} />

      <div className='pt-15 p-10'>
        <div className='flex flex-1 flex-col gap-y-10'>
          {renderStepContent()}

          <Button
            variant='primary'
            size='xl'
            className='w-full'
            disabled={!isNextValid}
            onClick={currentConfig.onClick}
          >
            {currentConfig.label}
          </Button>
        </div>
      </div>
    </>
  );
}
