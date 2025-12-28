'use client';

import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { Header } from '@muroom/components';
import { cn } from '@muroom/lib';

import Footer from '../../footer';

export interface Props {
  isHeader?: ComponentProps<typeof Header>;
  bottomSlot?: React.ReactNode;
  isFooter?: boolean;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  footerClassName?: string;
  bottomSlotClassName?: string;
  isModal?: boolean;
  onClose?: () => void;
}

const MobilePageWrapper = ({
  isHeader,
  bottomSlot,
  isFooter,
  children,
  className,
  contentClassName,
  footerClassName,
  bottomSlotClassName,
  isModal = false,
  onClose,
}: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  // 스크롤 감지 상태
  const [showBottomSlot, setShowBottomSlot] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleCloseAnimation = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onAnimationComplete = () => {
    if (isHeader?.onBackClick) isHeader.onBackClick();
    if (onClose) onClose();
  };

  const handleScroll = () => {
    if (!mainRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
    // 오차범위 20px 내로 바닥에 도달했는지 체크
    const isBottom = scrollTop + clientHeight >= scrollHeight - 20;

    setShowBottomSlot(isBottom);
  };

  useEffect(() => {
    handleScroll();
  }, [children]);

  const modalHeaderProps =
    isModal && isHeader
      ? {
          ...isHeader,
          onBackClick: () => handleCloseAnimation(),
        }
      : isHeader;

  const renderContent = (
    headerProps: ComponentProps<typeof Header> | undefined,
  ) => (
    <>
      {headerProps && (
        <Header
          {...headerProps}
          className={cn(
            'sticky top-0 z-50 flex-none border-b-[0.5px] border-b-gray-300 bg-white',
            headerProps.className,
          )}
        />
      )}

      <main
        ref={mainRef}
        onScroll={handleScroll}
        className={cn(
          'scrollbar-hide w-full flex-1 overflow-y-auto',
          {
            'px-5 pt-10': headerProps,
          },
          contentClassName,
        )}
      >
        {children}

        {isFooter && (
          <div className={cn('pt-20', footerClassName)}>
            <Footer isMobile />
          </div>
        )}

        {bottomSlot && <div className='h-36 w-full flex-none' />}
      </main>

      <AnimatePresence>
        {bottomSlot && showBottomSlot && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className='absolute bottom-0 z-50 w-full bg-white'
          >
            <div className={cn('px-5 pb-9 pt-3', bottomSlotClassName)}>
              {bottomSlot}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // --- [Render 1] 모달 모드 ---
  if (isModal) {
    return (
      <AnimatePresence onExitComplete={onAnimationComplete}>
        {isVisible && (
          <motion.div
            key='mobile-page-modal'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            className={cn(
              'absolute relative inset-0 z-50 flex h-dvh w-full flex-col overflow-hidden bg-white',
              className,
            )}
          >
            {renderContent(modalHeaderProps)}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // --- [Render 2] 일반 모드 ---
  return (
    <div
      className={cn(
        'relative flex h-dvh w-full flex-col overflow-hidden bg-white',
        className,
      )}
    >
      {renderContent(isHeader)}
    </div>
  );
};

export default MobilePageWrapper;
