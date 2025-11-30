'use client';

import { motion } from 'framer-motion';

import { cn } from '../lib/utils';

interface Props {
  progress: number;
  height?: number;
  className?: string;
}

const ProgressBar = ({ progress, height = 4, className }: Props) => {
  const currentProgress = Math.max(0, Math.min(100, progress));

  return (
    <div
      className={cn('w-full bg-gray-200', className)}
      style={{ height: `${height}px` }}
    >
      <motion.div
        className={cn(
          'h-full',
          currentProgress > 0 ? 'bg-primary-400' : 'bg-transparent',
        )}
        initial={{ width: '0%' }}
        animate={{ width: `${currentProgress}%` }}
        transition={{ duration: 1.2, ease: 'circOut' }}
      />
    </div>
  );
};

export default ProgressBar;
