'use client';

import { useState } from 'react';

import DesktopJoinPage from './desktop';
import MobileJoinPage from './mobile';

interface Props {
  isMobile: boolean;
}

export default function JoinPage({ isMobile }: Props) {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);

  const content = isMobile ? (
    <MobileJoinPage />
  ) : (
    <DesktopJoinPage step={currentStep} setStep={setCurrentStep} />
  );

  return <main className='h-full'>{content}</main>;
}
