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
  bottomFixedSlot?: React.ReactNode;
  isFooter?: boolean;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  footerClassName?: string;
  bottomSlotClassName?: string;
  bottomFixedSlotClassName?: string;
  isModal?: boolean;
  onClose?: () => void;
}

const MobilePageWrapper = ({
  isHeader,
  bottomSlot,
  bottomFixedSlot,
  isFooter,
  children,
  className,
  contentClassName,
  footerClassName,
  bottomSlotClassName,
  bottomFixedSlotClassName,
  isModal = false,
  onClose,
}: Props) => {
  const [isVisible, setIsVisible] = useState(true);

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
    if (!bottomSlot || !mainRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 20;
    setShowBottomSlot(isBottom);
  };

  useEffect(() => {
    if (bottomSlot) handleScroll();
  }, [children, bottomSlot]);
  // -----------------------------------------------------------

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
      {/* 1. Header (Sticky or Static) */}
      {headerProps && (
        <Header
          {...headerProps}
          className={cn(
            'sticky top-0 z-50 flex-none border-b-[0.5px] border-b-gray-300 bg-white',
            headerProps.className,
          )}
        />
      )}

      {/* 2. Main Content (Scrollable Area) */}
      <main
        ref={mainRef}
        onScroll={handleScroll}
        className={cn(
          'scrollbar-hide w-full flex-1 overflow-y-auto',
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

      {bottomFixedSlot && (
        <div
          className={cn(
            'z-50 w-full flex-none bg-white',
            bottomFixedSlotClassName,
          )}
        >
          {bottomFixedSlot}
        </div>
      )}

      {/* [기존] Bottom Slot (Absolute Position - 스크롤 감지용) */}
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
            // h-dvh: 모바일 브라우저 동적 뷰포트 대응
            className={cn(
              'fixed inset-0 z-50 flex h-dvh w-full flex-col overflow-hidden bg-white',
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
