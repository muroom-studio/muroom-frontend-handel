'use client';

import { useState } from 'react';

import Image, { ImageProps } from 'next/image';

import { cn } from '@muroom/lib';

export default function CommonImage({
  className,
  alt,
  priority,
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={alt || 'image'}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      decoding='async'
      className={cn(
        'transition-[filter,opacity,background-color] duration-500 ease-in-out',
        isLoading
          ? 'animate-pulse bg-gray-300 blur-xl grayscale'
          : 'bg-transparent blur-0 grayscale-0',
        className,
      )}
      onLoad={() => setIsLoading(false)}
    />
  );
}
