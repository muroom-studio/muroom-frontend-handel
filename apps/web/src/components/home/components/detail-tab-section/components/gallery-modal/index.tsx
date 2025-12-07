'use client';

import { useCallback, useEffect, useState } from 'react';

import { Header, Modal } from '@muroom/components';

import GroupImageSection from './group-view';
import SingleImageSection from './single-view';
import {
  CATEGORY_TITLES,
  GalleryCategory,
  GalleryImages,
  GalleryViewMode,
} from './types';

export function useGalleryModal() {
  const [viewMode, setViewMode] = useState<GalleryViewMode>('NONE');

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('main');

  const [initialIndex, setInitialIndex] = useState(0);

  const close = useCallback(() => {
    setViewMode('NONE');
    setInitialIndex(0);
    setActiveCategory('main');
  }, []);

  const openGroup = useCallback(() => {
    setViewMode('GROUP');
  }, []);

  const openSingle = useCallback(
    (category: GalleryCategory, index: number = 0) => {
      setActiveCategory(category);
      setInitialIndex(index);
      setViewMode('SINGLE');
    },
    [],
  );

  return {
    viewMode,
    activeCategory,
    initialIndex,
    isOpen: viewMode !== 'NONE',
    close,
    openGroup,
    openSingle,
  };
}

interface ImageGalleryModalProps {
  controller: ReturnType<typeof useGalleryModal>;
  images: GalleryImages;
}

export default function ImageGalleryModal({
  controller,
  images,
}: ImageGalleryModalProps) {
  const {
    isOpen,
    close,
    viewMode,
    activeCategory,
    initialIndex,
    openGroup,
    openSingle,
  } = controller;
  const currentCategoryImages = images[activeCategory] || [];

  const [_, setCurrentSlideIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) setCurrentSlideIndex(initialIndex);
  }, [isOpen, initialIndex]);

  const headerTitle =
    viewMode === 'GROUP' ? '전체 사진' : CATEGORY_TITLES[activeCategory];

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <Modal.Wrapper className='flex h-[80vh] w-[800px] max-w-full flex-col p-0'>
        {/* Header */}
        <Modal.Header
          className='px-5 pt-4'
          title={viewMode === 'GROUP' ? headerTitle : undefined}
          customTitle={
            viewMode === 'SINGLE' ? (
              <Header
                title={headerTitle}
                onBackClick={openGroup}
                className='p-0'
              />
            ) : undefined
          }
        />

        {/* Body */}
        <Modal.Body className='flex-1 overflow-y-auto p-5'>
          {viewMode === 'GROUP' && (
            <GroupImageSection images={images} onImageClick={openSingle} />
          )}

          {viewMode === 'SINGLE' && (
            <SingleImageSection
              images={currentCategoryImages}
              initialIndex={initialIndex}
              onIndexChange={setCurrentSlideIndex}
            />
          )}
        </Modal.Body>
      </Modal.Wrapper>
    </Modal>
  );
}
