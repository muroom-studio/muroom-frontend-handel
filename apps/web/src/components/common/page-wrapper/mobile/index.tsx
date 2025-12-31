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

  // --- [Case 1] 스크롤 감지 슬롯 (bottomSlot) 로직 ---
  const [showBottomSlot, setShowBottomSlot] = useState(false);

  // 스크롤이 발생하는 컨테이너를 참조해야 함
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!bottomSlot || !scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;

    // 오차범위 10px 내로 바닥에 도달했는지 체크
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
    setShowBottomSlot(isBottom);
  };

  useEffect(() => {
    // 초기 렌더링 시 스크롤이 필요 없는 짧은 컨텐츠라면 바로 bottomSlot을 보여줄지 결정
    if (bottomSlot) handleScroll();
  }, [children, bottomSlot]);

  // --- 모달 닫기 애니메이션 ---
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

  // --- 렌더링 레이아웃 구조 ---
  const renderLayout = (
    headerProps: ComponentProps<typeof Header> | undefined,
  ) => (
    <>
      {/* 1. Header (최상단 고정) */}
      {headerProps && (
        <Header
          {...headerProps}
          className={cn(
            'sticky top-0 z-50 flex-none border-b-[0.5px] border-b-gray-300 bg-white',
            headerProps.className,
          )}
        />
      )}

      {/* 2. Scrollable Container (헤더 제외 나머지 영역) 
          - flex-1: 남은 공간 모두 차지
          - overflow-y-auto: 내용이 넘치면 여기서 스크롤 발생
          - flex-col: 내부 컨텐츠와 푸터를 세로로 배치
      */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className='scrollbar-hide flex flex-1 flex-col overflow-y-auto bg-white'
      >
        {/* 2-A. Main Content 
            - flex-1: 컨텐츠가 짧아도 이 영역이 늘어나서 푸터를 바닥으로 밀어버림
        */}
        <main className={cn('w-full flex-1 px-5 pt-10', contentClassName)}>
          {children}
        </main>

        {/* 2-B. Footer & BottomFixedSlot Area 
            - flex-none: 높이만큼만 공간 차지
            - 스크롤 컨테이너 내부에 있으므로, 컨텐츠가 길면 스크롤 끝에 위치함
        */}
        {(isFooter || bottomFixedSlot) && (
          <div className='z-40 w-full flex-none bg-white'>
            {/* [Case 2] Bottom Fixed Slot */}
            {bottomFixedSlot && (
              <div className={cn('px-5 pb-9', bottomFixedSlotClassName)}>
                {bottomFixedSlot}
              </div>
            )}

            {/* [Case 3] Footer */}
            {isFooter && (
              <div className={cn('pt-4', footerClassName)}>
                <Footer isMobile />
              </div>
            )}

            {/* [Case 1 대응] bottomSlot이 존재할 경우 가려짐 방지용 여백 */}
            {bottomSlot && <div className='h-20 w-full' />}
          </div>
        )}
      </div>

      {/* 3. [Case 1] Scroll Triggered Bottom Slot (Absolute Overlay) 
          - 스크롤 컨테이너 바깥(뷰포트 기준)에 배치하여 위에 뜸
      */}
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
            className='absolute bottom-0 z-[60] w-full bg-white'
          >
            <div className={cn('px-5 pb-9 pt-3', bottomSlotClassName)}>
              {bottomSlot}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // --- [Render A] 모달 모드 ---
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
              'fixed inset-0 z-50 flex h-dvh w-full flex-col overflow-hidden bg-white',
              className,
            )}
          >
            {renderLayout(modalHeaderProps)}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // --- [Render B] 일반 페이지 모드 ---
  return (
    <div
      className={cn(
        'relative flex h-dvh w-full flex-col overflow-hidden bg-white',
        className,
      )}
    >
      {renderLayout(isHeader)}
    </div>
  );
};

export default MobilePageWrapper;
