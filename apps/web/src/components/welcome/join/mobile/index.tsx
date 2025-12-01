'use client';

import { Button, Progressbar } from '@muroom/components';

import WelcomeHeader from '../../components/header';
import { JoinCommonProps } from '../types';

export default function MobileJoinPage({
  progress,
  isNextValid,
  stepConfig,
  stepContent,
  onBackClick,
}: JoinCommonProps) {
  return (
    <div className='flex h-screen flex-col bg-white'>
      <WelcomeHeader backClickHandler={onBackClick} />

      <Progressbar progress={progress} />

      <div className='flex flex-1 flex-col overflow-y-auto px-4 pb-8 pt-10'>
        <div className='flex-1'>{stepContent}</div>

        <div className='mt-4 shrink-0'>
          <Button
            variant='primary'
            size='xl'
            className='w-full'
            disabled={!isNextValid}
            onClick={stepConfig.onClick}
          >
            {stepConfig.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
