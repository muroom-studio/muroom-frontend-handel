'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence, Variants, motion } from 'framer-motion';

import { cn } from '../lib/utils';

interface PopoverContextProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLElement | null>;
}

interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  align?: 'center' | 'start' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  matchTriggerWidth?: boolean;
}

interface PopoverMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  closeOnSelect?: boolean;
}

// ----------------------------------------------------------------------
// Context & Hooks
// ----------------------------------------------------------------------

const PopoverContext = createContext<PopoverContextProps | null>(null);

const usePopover = () => {
  const popoverContext = useContext(PopoverContext);
  if (!popoverContext) {
    throw new Error(
      'popover를 사용하기 위해선 무조건 popover provider로 감싸줘야합니다.',
    );
  }
  return popoverContext;
};

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

const Popover = ({
  children,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null); // ✅ 부모에서 Ref 관리

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setIsOpen = useCallback(
    (value: boolean) => {
      if (isControlled) {
        onOpenChange?.(value);
      } else {
        setUncontrolledOpen(value);
      }
    },
    [isControlled, onOpenChange],
  );

  // Outside Click 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;
      const target = event.target as Node;
      if (!target || !document.contains(target)) return;

      // ✅ 트리거와 컨텐츠 둘 다 아닐 때만 닫기
      const isOutsideTrigger =
        triggerRef.current && !triggerRef.current.contains(target);
      const isOutsideContent =
        contentRef.current && !contentRef.current.contains(target);

      if (isOutsideTrigger && isOutsideContent) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      triggerRef,
      contentRef,
    }),
    [isOpen, setIsOpen],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const { isOpen, setIsOpen, triggerRef } = usePopover();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-haspopup='dialog'
      style={{ cursor: 'pointer', display: 'inline-block' }}
    >
      {children}
    </div>
  );
};

// Framer Motion Variants
const popoverVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const PopoverContent = ({
  children,
  className = '',
  sideOffset = 8,
  align = 'center',
  side = 'bottom',
  matchTriggerWidth = false, // ✅ 기본값 false
}: PopoverContentProps) => {
  const { isOpen, triggerRef, contentRef } = usePopover();

  const [style, setStyle] = useState<{
    top: number;
    left: number;
    width?: number; // ✅ 너비 상태 추가
    maxHeight?: number;
    transformOrigin: string;
  }>({
    top: 0,
    left: 0,
    transformOrigin: 'center',
  });

  useEffect(() => {
    if (isOpen && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = 0,
        left = 0,
        transformOrigin = 'center';
      let calculatedMaxHeight = viewportHeight;

      // ✅ matchTriggerWidth 옵션이 켜져있으면 트리거 너비 사용
      let calculatedWidth: number | undefined = undefined;
      if (matchTriggerWidth) {
        calculatedWidth = triggerRect.width;
      }

      if (side === 'bottom') {
        top = triggerRect.bottom + window.scrollY + sideOffset;
        transformOrigin = 'top';
        calculatedMaxHeight =
          viewportHeight - triggerRect.bottom - sideOffset - 16;

        if (align === 'center') {
          left =
            triggerRect.left +
            window.scrollX +
            triggerRect.width / 2 -
            contentRect.width / 2;
        } else if (align === 'start') {
          left = triggerRect.left + window.scrollX;
          transformOrigin = 'top left';
        } else {
          left = triggerRect.right + window.scrollX - contentRect.width;
          transformOrigin = 'top right';
        }
      } else if (side === 'top') {
        top =
          triggerRect.top + window.scrollY - contentRect.height - sideOffset;
        transformOrigin = 'bottom';
        calculatedMaxHeight = triggerRect.top - sideOffset - 16;

        if (align === 'center') {
          left =
            triggerRect.left +
            window.scrollX +
            triggerRect.width / 2 -
            contentRect.width / 2;
        } else if (align === 'start') {
          left = triggerRect.left + window.scrollX;
          transformOrigin = 'bottom left';
        } else {
          left = triggerRect.right + window.scrollX - contentRect.width;
          transformOrigin = 'bottom right';
        }
      } else if (side === 'right') {
        left = triggerRect.right + window.scrollX + sideOffset;
        transformOrigin = 'left';

        if (align === 'center') {
          top =
            triggerRect.top +
            window.scrollY +
            triggerRect.height / 2 -
            contentRect.height / 2;
        } else if (align === 'start') {
          top = triggerRect.top + window.scrollY;
          transformOrigin = 'top left';
        } else {
          top = triggerRect.bottom + window.scrollY - contentRect.height;
          transformOrigin = 'bottom left';
        }
      } else if (side === 'left') {
        left =
          triggerRect.left + window.scrollX - contentRect.width - sideOffset;
        transformOrigin = 'right';

        if (align === 'center') {
          top =
            triggerRect.top +
            window.scrollY +
            triggerRect.height / 2 -
            contentRect.height / 2;
        } else if (align === 'start') {
          top = triggerRect.top + window.scrollY;
          transformOrigin = 'top right';
        } else {
          top = triggerRect.bottom + window.scrollY - contentRect.height;
          transformOrigin = 'bottom right';
        }
      }

      // 화면 밖으로 나가는 것 방지
      if (left < 8) left = 8;
      // matchTriggerWidth가 아닐 때만 우측 넘침 체크 (너비 고정이면 어차피 트리거 따라감)
      if (!matchTriggerWidth && left + contentRect.width > viewportWidth - 8) {
        left = viewportWidth - contentRect.width - 8;
      }

      setStyle({
        top,
        left,
        width: calculatedWidth,
        maxHeight: calculatedMaxHeight,
        transformOrigin,
      });
    }
  }, [
    isOpen,
    triggerRef,
    contentRef,
    sideOffset,
    align,
    side,
    matchTriggerWidth,
  ]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          variants={popoverVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={cn(
            'absolute z-[9999] flex flex-col overflow-y-auto',
            // matchTriggerWidth가 아닐 때는 내용물만큼만 차지하게 (w-full 제거)
            !matchTriggerWidth && 'w-auto',
            className,
          )}
          style={{
            top: `${style.top}px`,
            left: `${style.left}px`,
            width: style.width ? `${style.width}px` : undefined, // ✅ 계산된 너비 적용
            maxHeight: style.maxHeight ? `${style.maxHeight}px` : undefined,
            transformOrigin: style.transformOrigin,
          }}
          role='dialog'
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const PopoverMenuContainer = ({ children }: { children: React.ReactNode }) => (
  <div className='rounded-4 shadow-level-0 flex w-full flex-col overflow-hidden border border-gray-300 bg-white'>
    {children}
  </div>
);

const PopoverMenuItem = ({
  children,
  className,
  onClick,
  closeOnSelect = true,
  ...props
}: PopoverMenuItemProps) => {
  const { setIsOpen } = usePopover();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  const commonClasses =
    'w-full text-base-m-14-1 px-3 py-[9px] border-b border-b-gray-300 last:border-b-none text-left transition-colors hover:bg-gray-50';

  return (
    <div
      role='menuitem'
      onClick={handleClick}
      className={cn(commonClasses, 'cursor-pointer', className)}
      {...props}
    >
      {children}
    </div>
  );
};

// ----------------------------------------------------------------------
// Exports
// ----------------------------------------------------------------------

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.MenuContainer = PopoverMenuContainer;
Popover.MenuItem = PopoverMenuItem;

export default Popover;
