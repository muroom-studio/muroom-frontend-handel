'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface SnackbarProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
  label?: string;
  children?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

const Snackbar = ({
  isOpen,
  onClose,
  duration = 2000,
  label,
  children,
  className,
  showCloseButton = false,
}: SnackbarProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, type: 'spring', bounce: 0 }}
          className={cn(
            'absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2',
            'rounded-4 text-base-m-14-1 flex-between w-full gap-3 bg-gray-700 p-3 text-white',
            className,
          )}
        >
          <p>{children || label}</p>

          {showCloseButton && (
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className='text-base-m-14-2 shrink-0 cursor-pointer text-white'
            >
              확인
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
