'use client';

import { ComponentProps, useCallback, useState } from 'react';

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
  isModal = false,
  onClose,
}: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleCloseAnimation = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onAnimationComplete = () => {
    if (isHeader?.onBackClick) isHeader.onBackClick();
    if (onClose) onClose();
  };

  const modalHeaderProps =
    isModal && isHeader
      ? {
          ...isHeader,
          onBackClick: () => handleCloseAnimation(),
        }
      : isHeader;

  // --- [Content] 공통 렌더링 함수 ---
  const renderContent = (
    headerProps: ComponentProps<typeof Header> | undefined,
  ) => (
    <>
      {/* 1. 헤더 (고정) */}
      {headerProps && (
        <Header
          {...headerProps}
          className={cn(
            'sticky top-0 z-50 flex-none border-b-[0.5px] border-b-gray-300 bg-white',
            headerProps.className,
          )}
        />
      )}

      {/* 2. 메인 컨텐츠 & 푸터 (스크롤 영역) */}
      <main
        className={cn(
          'scrollbar-hide w-full flex-1 overflow-y-auto',
          {
            'px-5 pt-10': headerProps,
          },
          contentClassName,
        )}
      >
        {children}

        {isFooter && <Footer isMobile />}
      </main>

      {bottomSlot && (
        <div className='w-full flex-none bg-white'>
          <div className='px-5 pb-9'>{bottomSlot}</div>
        </div>
      )}
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
              'absolute inset-0 z-50 flex h-dvh w-full flex-col overflow-hidden bg-white',
              className,
            )}
          >
            {renderContent(modalHeaderProps)}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div
      className={cn(
        'flex h-dvh w-full flex-col overflow-hidden bg-white',
        className,
      )}
    >
      {renderContent(isHeader)}
    </div>
  );
};

export default MobilePageWrapper;
