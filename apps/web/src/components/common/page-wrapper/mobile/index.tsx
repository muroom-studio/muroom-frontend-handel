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

  // 모달 전용 props
  isModal?: boolean;
  onClose?: () => void;
}

const MobilePageWrapper = ({
  isHeader,
  bottomSlot,
  isFooter,
  children,
  className,
  isModal = false,
  onClose,
}: Props) => {
  // --- [Logic] 모달 제어 ---
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
        className={cn('relative w-full flex-1 pb-20', {
          'px-5 pt-10': headerProps,
        })}
      >
        {children}
      </main>

      {(bottomSlot || isFooter) && (
        <div className='w-full flex-none bg-white'>
          {bottomSlot}
          {isFooter && <Footer isMobile />}
        </div>
      )}
    </>
  );

  // --- [Render 1] 모달 모드 (세로 애니메이션 적용) ---
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
              'scrollbar-hide absolute inset-0 z-50 flex h-full w-full flex-col overflow-y-auto bg-white',
              className,
            )}
          >
            {renderContent(modalHeaderProps)}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // --- [Render 2] 일반 모드 (애니메이션 없음) ---
  return (
    <div
      className={cn(
        'scrollbar-hide flex h-full w-full flex-col overflow-y-auto bg-white',
        className,
      )}
    >
      {renderContent(isHeader)}
    </div>
  );
};

export default MobilePageWrapper;
