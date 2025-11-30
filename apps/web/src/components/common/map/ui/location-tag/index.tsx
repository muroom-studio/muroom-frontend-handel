'use client';

import { LocationIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useAddressFetch } from '@/hooks/api/kakao/useAddressFetch';

interface Props {
  mapCenter: { lat: number; lng: number };
  size?: 'L' | 'S';
  className?: string;
}

export default function LocationTag({
  mapCenter,
  size = 'L',
  className,
}: Props) {
  const { regionName } = useAddressFetch(mapCenter);

  return (
    <div
      className={cn(
        'flex-center rounded-1000 shadow-level-1 gap-x-1 bg-white',
        { 'text-base-l-16-2 p-3': size === 'L' },
        { 'text-base-m-14-2 px-3 py-[9px]': size === 'S' },
        className,
      )}
    >
      <LocationIcon className='size-5' />
      <span>{regionName || '로딩중'}</span>
    </div>
  );
}
