'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence, Variants, motion } from 'framer-motion';

import { cn } from '../lib/utils';

type Side = 'top' | 'bottom' | 'left' | 'right';

interface TooltipContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  side: Side;
  contentStyles: React.CSSProperties;
  sideOffset: number;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (context === undefined) {
    throw new Error('useTooltip must be used within a Tooltip component');
  }
  return context;
};

function TooltipProvider({
  delayDuration = 300,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { delayDuration?: number }) {
  return <div {...props} />;
}

type TooltipProps = {
  side?: Side;
  sideOffset?: number;
  delayDuration?: number;
  open?: boolean; // 외부에서 툴팁 열림 상태를 제어하기 위한 prop
} & React.ComponentPropsWithoutRef<'div'>;

function Tooltip({
  children,
  side = 'top',
  sideOffset = 10,
  delayDuration = 300,
  open: controlledOpen, // 외부에서 주입된 상태
  ...props
}: TooltipProps) {
  // 1. 내부적인 호버 상태 관리
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  // 2. 외부에서 open prop을 주면 그 값을 우선하고, 없으면 내부 호버 상태를 따름
  const isOpen =
    controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [contentStyles, setContentStyles] = useState<React.CSSProperties>({});

  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentHeight = contentRef.current.offsetHeight;
    const contentWidth = contentRef.current.offsetWidth;

    let x = 0;
    let y = 0;

    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;

    switch (side) {
      case 'top':
        x = triggerCenterX;
        y = triggerRect.top - contentHeight - sideOffset;
        break;
      case 'bottom':
        x = triggerCenterX;
        y = triggerRect.bottom + sideOffset;
        break;
      case 'left':
        x = triggerRect.left - contentWidth - sideOffset;
        y = triggerCenterY;
        break;
      case 'right':
        x = triggerRect.right + sideOffset;
        y = triggerCenterY;
        break;
    }

    setContentStyles({
      position: 'fixed',
      left: x,
      top: y,
      zIndex: 9999,
    });
  }, [side, sideOffset]);

  useLayoutEffect(() => {
    if (isOpen && contentRef.current && triggerRef.current) {
      calculatePosition();

      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);

      const resizeObserver = new ResizeObserver(() => {
        calculatePosition();
      });
      resizeObserver.observe(contentRef.current);
      resizeObserver.observe(triggerRef.current);

      return () => {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
        resizeObserver.disconnect();
      };
    }
  }, [isOpen, calculatePosition]);

  const handleMouseEnter = useCallback(() => {
    // 제어 모드(open prop이 있을 때)일 때는 호버 이벤트를 무시하거나 추가 로직 처리
    if (controlledOpen !== undefined) return;

    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    enterTimerRef.current = setTimeout(
      () => setUncontrolledOpen(true),
      delayDuration,
    );
  }, [delayDuration, controlledOpen]);

  const handleMouseLeave = useCallback(() => {
    if (controlledOpen !== undefined) return;

    if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
    leaveTimerRef.current = setTimeout(() => setUncontrolledOpen(false), 100);
  }, [controlledOpen]);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen: setUncontrolledOpen,
      triggerRef,
      contentRef,
      side,
      sideOffset,
      contentStyles,
    }),
    [isOpen, side, sideOffset, contentStyles],
  );

  return (
    <TooltipContext.Provider value={value}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

type TooltipTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
  ref?: React.Ref<HTMLElement>;
  asChild?: boolean;
};

function TooltipTrigger({
  className,
  children,
  ref,
  asChild = false,
  ...props
}: TooltipTriggerProps) {
  const { triggerRef, setIsOpen } = useTooltip();

  const mergedRef = useCallback(
    (node: HTMLElement | null) => {
      (triggerRef.current as HTMLElement | null) = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    [ref, triggerRef],
  );

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsOpen((prev) => !prev);
    props.onClick?.(e as any);
  };

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as Record<string, any>;

    return React.cloneElement(children, {
      ref: mergedRef,
      className: cn(childProps.className, className),
      ...props,
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        props.onMouseEnter?.(e as any);
        childProps.onMouseEnter?.(e);
      },
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        props.onMouseLeave?.(e as any);
        childProps.onMouseLeave?.(e);
      },
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        handleClick(e);
        childProps.onClick?.(e);
      },
    } as React.Attributes & { [key: string]: any });
  }

  return (
    <button
      ref={mergedRef as React.Ref<HTMLButtonElement>}
      data-slot='tooltip-trigger'
      className={cn('inline-flex', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
TooltipTrigger.displayName = 'TooltipTrigger';

type TooltipContentProps = React.ComponentPropsWithoutRef<'div'> & {
  ref?: React.Ref<HTMLDivElement>;
};

function TooltipContent({
  className,
  children,
  ref,
  ...props
}: TooltipContentProps) {
  const { isOpen, contentRef, side, contentStyles, setIsOpen } = useTooltip();

  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref, contentRef],
  );

  const getAnimationVariants = (side: Side): Variants => {
    const xCenter = side === 'top' || side === 'bottom' ? '-50%' : '0%';
    const yCenter = side === 'left' || side === 'right' ? '-50%' : '0%';

    return {
      initial: {
        opacity: 0,
        scale: 0.9,
        x: side === 'left' ? 5 : side === 'right' ? -5 : xCenter,
        y: side === 'top' ? 5 : side === 'bottom' ? -5 : yCenter,
      },
      animate: {
        opacity: 1,
        scale: 1,
        x: xCenter,
        y: yCenter,
        transition: { type: 'spring', duration: 0.3, bounce: 0 },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        x: side === 'left' ? 5 : side === 'right' ? -5 : xCenter,
        y: side === 'top' ? 5 : side === 'bottom' ? -5 : yCenter,
        transition: { duration: 0.2 },
      },
    };
  };

  const arrowClass = useMemo(() => {
    const baseClass = 'absolute w-0 h-0 border-[6px] border-transparent';
    switch (side) {
      case 'top':
        return `${baseClass} top-full left-1/2 -translate-x-1/2 border-t-gray-700`;
      case 'bottom':
        return `${baseClass} bottom-full left-1/2 -translate-x-1/2 border-b-gray-700`;
      case 'left':
        return `${baseClass} left-full top-1/2 -translate-y-1/2 border-l-gray-700`;
      case 'right':
        return `${baseClass} right-full top-1/2 -translate-y-1/2 border-r-gray-700`;
      default:
        return '';
    }
  }, [side]);

  const transformOriginMap = {
    top: 'bottom center',
    bottom: 'top center',
    left: 'right center',
    right: 'left center',
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={mergedRef}
          data-slot='tooltip-content'
          data-side={side}
          variants={getAnimationVariants(side)}
          initial='initial'
          animate='animate'
          exit='exit'
          className={cn(
            'text-base-m-14-1 rounded-4 z-50 w-fit whitespace-pre break-keep bg-gray-700 p-3 text-center text-white',
            className,
          )}
          style={{
            ...contentStyles,
            transformOrigin: transformOriginMap[side],
          }}
          onClick={() => setIsOpen(false)}
          {...(props as any)}
        >
          {children}
          <div className={arrowClass} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
