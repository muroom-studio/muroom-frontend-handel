'use client';

import { MinusIcon, PlusIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

type Props = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  className?: string;
};

export default function ZoomControls({
  onZoomIn,
  onZoomOut,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'shadow-level-1 rounded-4 flex flex-col bg-white px-1 py-[11px]',
        className,
      )}
    >
      <button
        onClick={onZoomIn}
        className='flex-center cursor-pointer px-1.5 pb-[9px]'
        aria-label='지도 확대'
      >
        <PlusIcon className='size-6' />
      </button>
      <div className='h-px bg-gray-300' />
      <button
        onClick={onZoomOut}
        className='flex-center cursor-pointer px-1.5 pt-[9px]'
        aria-label='지도 축소'
      >
        <MinusIcon className='size-6' />
      </button>
    </div>
  );
}
