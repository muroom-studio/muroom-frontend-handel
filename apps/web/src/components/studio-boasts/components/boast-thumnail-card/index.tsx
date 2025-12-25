'use client';

import { useState } from 'react';

import Image from 'next/image';

import { ToggleButton } from '@muroom/components';
import { HeartIcon } from '@muroom/icons';

interface Props {
  thumbnailSrcUrl: string;
  isLike?: boolean;
}

export default function BoastThumbnailCard({
  thumbnailSrcUrl,
  isLike = false,
}: Props) {
  const [wish, setWish] = useState(isLike);
  return (
    <div className='relative aspect-square w-full overflow-hidden'>
      <Image
        src={thumbnailSrcUrl}
        alt={`${thumbnailSrcUrl}-썸네일`}
        fill
        className='object-cover'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />

      <div className='absolute right-4 top-4'>
        <ToggleButton
          variant='outline_icon'
          selected={wish}
          onSelectedChange={setWish}
          className={`${wish ? 'bg-primary-400' : 'bg-gray-300'} rounded-1000 size-6 border-none text-white`}
        >
          <HeartIcon />
        </ToggleButton>
      </div>
    </div>
  );
}
