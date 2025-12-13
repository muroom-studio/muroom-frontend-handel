'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';

import { CloseIcon } from '../icons-generated';
import { cn } from '../lib/utils';

interface ModalContextProps {
  onClose: () => void;
}
const ModalContext = createContext<ModalContextProps>({
  onClose: () => {},
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;

    // 모달 열릴 때 스크롤 막기
    document.body.style.overflow = 'hidden';

    // ESC 키로 닫기
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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <ModalContext.Provider value={{ onClose }}>
          {/* 배경 (Backdrop) */}
          <motion.div
            onClick={onClose}
            className='fixed inset-0 z-50 bg-black/50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          {/* 모달 컨텐츠 */}
          {children}
        </ModalContext.Provider>
      )}
    </AnimatePresence>,
    document.body,
  );
}

interface ModalWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

const ModalWrapper = ({ className, children, ...props }: ModalWrapperProps) => {
  return (
    <motion.div
      className={cn(
        'rounded-4 z-9999 fixed left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 bg-white p-5 pt-4',
        className,
      )}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  customTitle?: React.ReactNode;
}

const ModalHeader = ({
  className,
  title,
  customTitle,
  ...props
}: ModalHeaderProps) => {
  const { onClose } = useContext(ModalContext);

  return (
    <div
      className={cn(
        'flex items-center justify-between border-b-[0.5px] border-b-gray-300 pb-4',
        className,
      )}
      {...props}
    >
      {customTitle ? (
        customTitle
      ) : (
        <span className='text-base-exl-18-2 text-black'>{title}</span>
      )}

      <CloseIcon
        onClick={onClose}
        aria-label='Close'
        className='size-6 cursor-pointer'
      />
    </div>
  );
};

interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalBody = ({ className, ...props }: ModalBodyProps) => (
  <div className={cn('flex flex-col pt-5', className)} {...props} />
);

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalFooter = ({ className, ...props }: ModalFooterProps) => (
  <div className={cn('flex-center w-full pt-5', className)} {...props} />
);

Modal.Wrapper = ModalWrapper;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
