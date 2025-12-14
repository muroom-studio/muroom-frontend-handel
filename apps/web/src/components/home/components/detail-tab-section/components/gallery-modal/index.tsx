'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { Header } from '@muroom/components';
import { CloseIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

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

  const { isMobile } = useResponsiveLayout();
  const [mounted, setMounted] = useState(false);
  const [_, setCurrentSlideIndex] = useState(initialIndex);

  const currentCategoryImages = images[activeCategory] || [];

  useEffect(() => {
    setMounted(true);
    if (isOpen) setCurrentSlideIndex(initialIndex);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  const headerTitle =
    viewMode === 'GROUP'
      ? isMobile
        ? '사진'
        : '전체 사진'
      : CATEGORY_TITLES[activeCategory];

  const handleBackClick = () => {
    if (viewMode === 'SINGLE') {
      openGroup();
    } else if (isMobile && viewMode === 'GROUP') {
      close();
    }
  };

  const showCustomHeader = isMobile || viewMode === 'SINGLE';

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className='z-99999 fixed inset-0 flex items-center justify-center'>
          <motion.div
            className='absolute inset-0 bg-black/50'
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className={cn(
              'relative flex flex-col overflow-hidden bg-white shadow-xl',
              isMobile
                ? 'h-full w-full rounded-none'
                : 'rounded-4 h-[832px] w-[1091px] max-w-full',
            )}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div
              className={cn(
                'flex-none border-b-[0.5px] border-b-gray-300 px-5 py-4',
              )}
            >
              {showCustomHeader ? (
                <Header
                  title={headerTitle}
                  onBackClick={handleBackClick}
                  className='p-0'
                />
              ) : (
                <div className='flex-between'>
                  <span className='text-base-l-16-2 text-black'>
                    {headerTitle}
                  </span>
                  <button
                    onClick={close}
                    type='button'
                    className='cursor-pointer'
                  >
                    <CloseIcon className='size-6 text-gray-900' />
                  </button>
                </div>
              )}
            </div>

            {/* Body Area */}
            <div
              className={cn('flex-1 overflow-y-auto px-5', {
                'py-5': !(viewMode === 'SINGLE' && isMobile),
                'px-0': viewMode === 'SINGLE' && isMobile,
              })}
            >
              {viewMode === 'GROUP' && (
                <GroupImageSection images={images} onImageClick={openSingle} />
              )}

              {viewMode === 'SINGLE' && (
                <SingleImageSection
                  images={currentCategoryImages}
                  initialIndex={initialIndex}
                  onIndexChange={setCurrentSlideIndex}
                  isMobile={isMobile}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
