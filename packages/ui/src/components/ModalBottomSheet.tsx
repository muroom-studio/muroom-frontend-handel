'use client';

import React from 'react';

import { AnimatePresence, PanInfo, motion } from 'framer-motion';

import { cn } from '../lib/utils';

interface ModalBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  isScroll?: boolean;
  topMargin?: number;
  footerBtns?: React.ReactNode;
}

const ModalBottomSheet = ({
  isOpen,
  onClose,
  children,
  className,
  isScroll = false,
  topMargin = 60,
  footerBtns,
}: ModalBottomSheetProps) => {
  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='z-100 fixed inset-0 bg-black/70'
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag='y'
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            dragSnapToOrigin
            onDragEnd={handleDragEnd}
            style={{
              height: isScroll ? `calc(100% - ${topMargin}px)` : 'auto',
              top: isScroll ? topMargin : undefined,
            }}
            className={cn(
              'z-101 fixed left-0 right-0 flex flex-col rounded-t-[20px] bg-white shadow-2xl',
              !isScroll && 'bottom-0 max-h-[90dvh]',
              className,
            )}
          >
            <div className='my-4 flex flex-none cursor-grab touch-none items-center justify-center active:cursor-grabbing'>
              <div className='rounded-1000 h-1 w-8 bg-gray-300' />
            </div>

            <div
              className={cn(
                'scrollbar-hide flex-1',
                isScroll ? 'overflow-y-scroll' : 'overflow-y-auto',
              )}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className='p-5'>{children}</div>
              {footerBtns && (
                <div className='w-full px-2.5 py-3'>{footerBtns}</div>
              )}
              <div className='h-[34px]' />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalBottomSheet;
