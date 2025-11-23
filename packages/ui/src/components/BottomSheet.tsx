'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  motion,
  useAnimation,
  PanInfo,
  useMotionValue,
  useDragControls,
  MotionValue,
} from 'framer-motion';
import { cn } from '../lib/utils';

interface BottomSheetProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  topMargin?: number;
  middleRatio?: number;
  minHeight?: number;
  footerHeight?: number;
  className?: string;
  showCloseButton?: boolean;
  externalY?: MotionValue<number>;
}

export default function BottomSheet({
  children,
  header,
  topMargin = 118,
  middleRatio = 0.4,
  minHeight = 80,
  footerHeight = 64,
  className,
  showCloseButton,
  externalY,
}: BottomSheetProps) {
  const controls = useAnimation();
  const dragControls = useDragControls();

  const internalY = useMotionValue(0);
  const y = externalY || internalY;

  const [windowHeight, setWindowHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);

      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const OPEN_Y = topMargin;

  const MIDDLE_Y = windowHeight * (1 - middleRatio);

  const CLOSED_Y = windowHeight - footerHeight - minHeight;

  const [sheetState, setSheetState] = useState<'open' | 'middle' | 'closed'>(
    'middle',
  );

  useEffect(() => {
    if (windowHeight > 0) {
      controls.start({ y: MIDDLE_Y });
    }
  }, [windowHeight, MIDDLE_Y, controls]);

  const toOpen = () => {
    controls.start({ y: OPEN_Y });
    setSheetState('open');
  };
  const toMiddle = () => {
    controls.start({ y: MIDDLE_Y });
    setSheetState('middle');
  };
  const toClosed = () => {
    controls.start({ y: CLOSED_Y });
    setSheetState('closed');
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const { velocity, offset } = info;
    const currentY = y.get();

    if (sheetState === 'middle') {
      if (Math.abs(velocity.y) > 200) {
        if (velocity.y < 0) toOpen();
        else toClosed();
        return;
      }
      if (offset.y > 10) {
        toClosed();
        return;
      }
      if (offset.y < -10) {
        toOpen();
        return;
      }
    }

    if (sheetState === 'open') {
      if (velocity.y > 200) {
        toMiddle();
        return;
      }
      if (offset.y > 10) {
        toMiddle();
        return;
      }
      toOpen();
      return;
    }

    if (Math.abs(velocity.y) > 300) {
      if (velocity.y < 0) toMiddle();
      else toClosed();
      return;
    }

    const distToOpen = Math.abs(currentY - OPEN_Y);
    const distToMiddle = Math.abs(currentY - MIDDLE_Y);
    const distToClosed = Math.abs(currentY - CLOSED_Y);

    if (distToOpen < distToMiddle && distToOpen < distToClosed) toOpen();
    else if (distToClosed < distToMiddle) toClosed();
    else toMiddle();
  };

  if (windowHeight === 0) return null;

  return (
    <motion.div
      drag='y'
      dragConstraints={{ top: OPEN_Y, bottom: CLOSED_Y }}
      dragElastic={{ top: 0, bottom: 0.2 }}
      dragMomentum={false}
      dragControls={dragControls}
      dragListener={false}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ y: windowHeight }}
      transition={{ type: 'spring', damping: 40, stiffness: 300 }}
      style={{
        y,
        height: '100%',
        paddingBottom: `${footerHeight}px`,
      }}
      className={cn(
        'shadow-level-0 fixed left-0 right-0 z-50 flex h-full flex-col rounded-t-[20px] bg-white',
        className,
      )}
    >
      <div
        onPointerDown={(e) => dragControls.start(e)}
        onClick={() => {
          if (sheetState === 'closed') toMiddle();
        }}
        className='flex-none cursor-grab touch-none pb-2 pt-3 active:cursor-grabbing'
      >
        <div className='rounded-1000 mx-auto h-1 w-8 bg-gray-300' />
        {header && <div className='mt-2 px-4'>{header}</div>}
      </div>

      <div
        ref={contentRef}
        onPointerDown={(e) => {
          if (sheetState !== 'open') {
            dragControls.start(e);
          } else {
            if (contentRef.current && contentRef.current.scrollTop <= 0) {
              dragControls.start(e);
            }
          }
        }}
        className={cn(
          'scrollbar-hide flex-1 bg-white px-4',
          `pb-[${footerHeight + 40}px]`,

          'overscroll-y-none',
          sheetState === 'open'
            ? 'touch-pan-y overflow-y-auto'
            : 'cursor-grab touch-none overflow-hidden active:cursor-grabbing',
        )}
        style={{ paddingBottom: `${footerHeight + 40}px` }}
      >
        {children}
      </div>
    </motion.div>
  );
}
