'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';

import { cn } from '../lib/utils';
import Button from './Button';
import Spinner from './Spinner';

type AlertVariant = 'positive' | 'negative' | 'neutral';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title: string;
  content?: React.ReactNode;
  variant?: AlertVariant;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmDisabled?: boolean;
}

export default function Alert({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title,
  content,
  variant = 'neutral',
  cancelLabel = '취소하기',
  confirmLabel,
  confirmDisabled = false,
}: AlertProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  const styles = {
    positive: {
      title: 'text-title-s-22-2 text-primary-600',
    },
    negative: {
      title: 'text-title-s-22-2 text-red-500',
    },
    neutral: {
      title: 'text-title-s-22-2 text-gray-800',
    },
  };

  const currentStyle = styles[variant];

  const finalConfirmLabel =
    confirmLabel || (variant === 'negative' ? '차단하기' : '등록하기');

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={onClose}
            className='fixed inset-0 z-50 bg-black/50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Alert Modal */}
          <AlertWrapper>
            <div className='px-5 pb-5 pt-10'>
              {/* Title */}
              <h2 className={currentStyle.title}>{title}</h2>

              {/* Content */}
              <div className='text-base-l-16-1 whitespace-pre-wrap pb-10 pt-6'>
                {content}
              </div>

              {/* Buttons */}
              <div className='flex justify-end gap-x-2.5'>
                {/* 취소 버튼 */}
                <Button variant='outline' size='xl' onClick={onClose}>
                  {cancelLabel}
                </Button>

                {/* 확인 버튼 */}
                {variant === 'negative' ? (
                  <Button
                    onClick={onConfirm}
                    variant='danger'
                    disabled={confirmDisabled}
                  >
                    {isLoading ? (
                      <Spinner variant='component' />
                    ) : (
                      finalConfirmLabel
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={onConfirm}
                    variant='primary'
                    size='xl'
                    disabled={confirmDisabled || isLoading}
                  >
                    {isLoading ? (
                      <Spinner variant='component' />
                    ) : (
                      finalConfirmLabel
                    )}
                  </Button>
                )}
              </div>
            </div>
          </AlertWrapper>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

const AlertWrapper = ({
  className,
  children,
  ...props
}: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      className={cn(
        'rounded-4 z-9999 w-105 fixed left-1/2 top-1/2 bg-white shadow-xl',
        className,
      )}
      initial={{
        opacity: 0,
        scale: 0.95,
        x: '-50%',
        y: '-45%',
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: '-50%',
        y: '-50%',
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
        x: '-50%',
        y: '-45%',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
