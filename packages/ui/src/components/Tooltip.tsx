'use client';

import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';

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
} & React.ComponentPropsWithoutRef<'div'>;

function Tooltip({
  children,
  side = 'top',
  sideOffset = 10,
  delayDuration = 300,
  ...props
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentStyles, setContentStyles] = useState<React.CSSProperties>({});

  const enterTimerRef = useRef<number | null>(null);
  const leaveTimerRef = useRef<number | null>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    let x = 0;
    let y = 0;

    const centerX =
      triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
    const centerY =
      triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;

    switch (side) {
      case 'top':
        x = centerX;
        y = triggerRect.top - contentRect.height - sideOffset;
        break;
      case 'bottom':
        x = centerX;
        y = triggerRect.bottom + sideOffset;
        break;
      case 'left':
        x = triggerRect.left - contentRect.width - sideOffset;
        y = centerY;
        break;
      case 'right':
        x = triggerRect.right + sideOffset;
        y = centerY;
        break;
    }

    setContentStyles({
      position: 'fixed',
      left: x + window.scrollX,
      top: y + window.scrollY,
      zIndex: 50,
      transformOrigin:
        side === 'top' || side === 'bottom' ? 'center top' : 'left center',
    });
  }, [side, sideOffset]);

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(calculatePosition, 0);
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('scroll', calculatePosition);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isOpen, calculatePosition]);

  const handleMouseEnter = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    enterTimerRef.current = window.setTimeout(
      () => setIsOpen(true),
      delayDuration,
    );
  }, [delayDuration]);

  const handleMouseLeave = useCallback(() => {
    if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
    leaveTimerRef.current = window.setTimeout(() => setIsOpen(false), 100);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
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
  const { triggerRef } = useTooltip();

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
        props.onClick?.(e as any);
        childProps.onClick?.(e);
      },
    } as React.Attributes & { [key: string]: any });
  }

  return (
    <button
      ref={mergedRef as React.Ref<HTMLButtonElement>}
      data-slot='tooltip-trigger'
      className={cn('inline-flex', className)}
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
  const { isOpen, contentRef, side, contentStyles } = useTooltip();

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

  // 💡 Border Trick 화살표 클래스
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

  if (!isOpen) {
    return null;
  }

  const bgColorClass = 'bg-gray-700';

  const content = (
    <div
      ref={mergedRef}
      data-slot='tooltip-content'
      data-side={side}
      className={cn(
        'text-base-m-14-1 rounded-4 z-50 w-fit whitespace-pre-wrap text-balance p-3 text-center text-white',
        bgColorClass,
        'opacity-0 transition-opacity duration-150 ease-in-out',
        isOpen ? 'opacity-100' : 'opacity-0',
        className,
      )}
      style={{
        ...contentStyles,
      }}
      {...props}
    >
      {children}

      {/* Border Trick 화살표 */}
      <div className={arrowClass} />
    </div>
  );

  return createPortal(content, document.body);
}
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
