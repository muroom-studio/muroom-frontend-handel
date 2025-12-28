'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence, PanInfo, motion } from 'framer-motion';

import { cn } from '../lib/utils';

const EASING_EMPHASIZED_DECELERATE = [0.05, 0.7, 0.1, 1.0] as const;
const EASING_EMPHASIZED_ACCELERATE = [0.3, 0.0, 0.8, 0.15] as const;

interface ModalBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  footerClassName?: string;
  isScroll?: boolean;
  topMargin?: number;
  footerBtns?: React.ReactNode;
}

const ModalBottomSheet = ({
  isOpen,
  onClose,
  children,
  className,
  bodyClassName,
  footerClassName,
  isScroll = false,
  topMargin = 60,
  footerBtns,
}: ModalBottomSheetProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
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
            animate={{
              y: 0,
              transition: {
                duration: 0.4,
                ease: EASING_EMPHASIZED_DECELERATE,
              },
            }}
            exit={{
              y: '100%',
              transition: {
                duration: 0.2,
                ease: EASING_EMPHASIZED_ACCELERATE,
              },
            }}
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
              <div className={cn('p-5', bodyClassName)}>{children}</div>
              {footerBtns && (
                <div className={cn('w-full px-2.5 py-3', footerClassName)}>
                  {footerBtns}
                </div>
              )}
              <div className='h-8.5' />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ModalBottomSheet;
