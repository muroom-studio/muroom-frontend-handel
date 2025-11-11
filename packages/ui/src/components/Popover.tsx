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

import { cn } from '../lib/utils';

interface PopoverContextProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
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
}

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

const Popover = ({
  children,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target || !document.contains(event.target as Node)) {
        return;
      }

      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

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
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  );
};

const PopoverContent = ({
  children,
  className = '',
  sideOffset = 8,
  align = 'center',
  side = 'bottom',
}: PopoverContentProps) => {
  const { isOpen, triggerRef, contentRef } = usePopover();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = 0,
        left = 0;

      // side prop에 따라 위치 계산
      if (side === 'bottom') {
        top = triggerRect.bottom + window.scrollY + sideOffset;
        if (align === 'center') {
          left =
            triggerRect.left +
            window.scrollX +
            triggerRect.width / 2 -
            contentRect.width / 2;
        } else if (align === 'start') {
          left = triggerRect.left + window.scrollX;
        } else {
          left = triggerRect.right + window.scrollX - contentRect.width;
        }
      } else if (side === 'top') {
        top =
          triggerRect.top + window.scrollY - contentRect.height - sideOffset;
        if (align === 'center') {
          left =
            triggerRect.left +
            window.scrollX +
            triggerRect.width / 2 -
            contentRect.width / 2;
        } else if (align === 'start') {
          left = triggerRect.left + window.scrollX;
        } else {
          left = triggerRect.right + window.scrollX - contentRect.width;
        }
      } else if (side === 'right') {
        left = triggerRect.right + window.scrollX + sideOffset;
        if (align === 'center') {
          top =
            triggerRect.top +
            window.scrollY +
            triggerRect.height / 2 -
            contentRect.height / 2;
        } else if (align === 'start') {
          top = triggerRect.top + window.scrollY;
        } else {
          top = triggerRect.bottom + window.scrollY - contentRect.height;
        }
      } else if (side === 'left') {
        left =
          triggerRect.left + window.scrollX - contentRect.width - sideOffset;
        if (align === 'center') {
          top =
            triggerRect.top +
            window.scrollY +
            triggerRect.height / 2 -
            contentRect.height / 2;
        } else if (align === 'start') {
          top = triggerRect.top + window.scrollY;
        } else {
          top = triggerRect.bottom + window.scrollY - contentRect.height;
        }
      }

      if (left < 8) {
        left = 8;
      }
      if (left + contentRect.width > viewportWidth - 8) {
        left = viewportWidth - contentRect.width - 8;
      }
      if (top < 8) {
        top = 8;
      }
      if (top + contentRect.height > viewportHeight - 8) {
        top = viewportHeight - contentRect.height - 8;
      }

      setPosition({ top, left });
    }
  }, [isOpen, triggerRef, contentRef, sideOffset, align, side]);

  if (!isMounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={contentRef}
      className={`absolute z-50 ${className} data-[state=open]:animate-in data-[state=closed]:animate-out`}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      data-state={isOpen ? 'open' : 'closed'}
      role='dialog'
    >
      {children}
    </div>,
    document.body,
  );
};

const PopoverMenuContainer = ({ children }: { children: React.ReactNode }) => (
  <div className='flex-center-col rounded-L shadow-modal-s w-full gap-y-2 border border-white/60 bg-white p-2'>
    {children}
  </div>
);

const PopoverMenuItem = ({ children }: { children: React.ReactNode }) => {
  const commonClasses =
    'rounded-L hover:bg-text-box text-text-body-l1 w-[180] p-4 text-left';

  return <div className={cn(commonClasses, 'cursor-pointer')}>{children}</div>;
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.MenuContainer = PopoverMenuContainer;
Popover.MenuItem = PopoverMenuItem;

export default Popover;
