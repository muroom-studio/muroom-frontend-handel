'use client';

import Image from 'next/image';

import { CATEGORY_TITLES, GalleryCategory, GalleryImages } from '../types';

interface Props {
  images: GalleryImages;
  onImageClick: (category: GalleryCategory, index: number) => void;
}

export default function GroupImageSection({ images, onImageClick }: Props) {
  const renderSection = (category: GalleryCategory, imgs: string[]) => {
    if (!imgs || imgs.length === 0) return null;

    const title = CATEGORY_TITLES[category];

    return (
      <div className='border-b border-b-gray-200 py-5 first:pt-0 last:border-b-0 last:pb-0'>
        <h3 className='text-base-l-16-2 mb-3'>
          {title}({imgs.length})
        </h3>
        <div className='grid grid-cols-3 gap-2'>
          {imgs.map((img, idx) => (
            <div
              key={`${category}-${idx}`}
              className='rounded-4 relative aspect-square cursor-pointer overflow-hidden'
              onClick={() => onImageClick(category, idx)}
            >
              <Image
                src={img}
                alt={`${category}-${idx}`}
                fill
                className='object-cover transition-opacity hover:opacity-90'
                unoptimized
                sizes='(max-width: 768px) 33vw, 200px'
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col'>
      {renderSection('main', images.main)}
      {renderSection('building', images.building)}
      {renderSection('room', images.room)}
    </div>
  );
}
