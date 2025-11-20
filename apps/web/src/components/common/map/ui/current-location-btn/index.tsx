'use client';

import { TargetIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

type Props = {
  onClick: () => void;
  className?: string;
};

export default function CurrentLocationBtn({ onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-center rounded-4 shadow-level-1 cursor-pointer border border-gray-300 bg-white p-[10px]',
        className,
      )}
      aria-label='현재 위치로 이동'
    >
      <TargetIcon className='size-6 text-gray-700' />
    </button>
  );
}
