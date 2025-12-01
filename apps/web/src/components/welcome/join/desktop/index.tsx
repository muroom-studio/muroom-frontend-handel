'use client';

import { Button, Progressbar } from '@muroom/components';

import WelcomeHeader from '../../components/header';
import { JoinCommonProps } from '../types';

export default function DesktopJoinPage({
  progress,
  isNextValid,
  stepConfig,
  stepContent,
  onBackClick,
}: JoinCommonProps) {
  return (
    <>
      <WelcomeHeader backClickHandler={onBackClick} />
      <Progressbar progress={progress} />

      <div className='pt-15 flex h-full flex-col justify-between p-10'>
        <div className='flex-1'>{stepContent}</div>

        <div className='mt-6'>
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
    </>
  );
}
