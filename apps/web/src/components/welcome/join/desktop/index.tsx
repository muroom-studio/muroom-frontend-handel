'use client';

import { Button, Progressbar } from '@muroom/components';
import { cn } from '@muroom/lib';

import WelcomeHeader from '../../components/header';
import { JoinCommonProps } from '../types';

export default function DesktopJoinPage({
  step,
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

      <div
        className={cn('flex h-full flex-col justify-between p-10', {
          'pt-15': step !== 0,
        })}
      >
        <div className='flex-1'>{stepContent}</div>

        <div className='mt-8'>
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
