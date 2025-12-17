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

// ----------------------------------------------------------------------
// Interfaces
// ----------------------------------------------------------------------

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

  // Outside Click 감지
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

  // [수정] maxHeight를 포함한 스타일 상태 관리
  const [style, setStyle] = useState<{
    top: number;
    left: number;
    maxHeight?: number;
  }>({
    top: 0,
    left: 0,
  });
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

      // [핵심] 뷰포트 높이 기반 Max Height 계산을 위한 변수
      // 기본적으로 화면 전체 높이를 사용하되, 아래 로직에서 가용 공간으로 덮어씌움
      let calculatedMaxHeight = viewportHeight;

      // --- Side 계산 (위치 및 높이 제한) ---
      if (side === 'bottom') {
        top = triggerRect.bottom + window.scrollY + sideOffset;

        // [Bottom일 때] Trigger 아래쪽 남은 공간 계산 (하단 여백 16px 확보)
        const availableSpace =
          viewportHeight - triggerRect.bottom - sideOffset - 16;
        calculatedMaxHeight = availableSpace;

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

        // [Top일 때] Trigger 위쪽 남은 공간 계산
        const availableSpace = triggerRect.top - sideOffset - 16;
        calculatedMaxHeight = availableSpace;

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

      // --- 가로축(Left) 화면 충돌 방지 ---
      if (left < 8) {
        left = 8;
      }
      if (left + contentRect.width > viewportWidth - 8) {
        left = viewportWidth - contentRect.width - 8;
      }

      // [수정] 세로축 강제 이동 로직 제거
      // 높이 부족 시 위치를 옮기는 대신 maxHeight로 스크롤을 유도합니다.

      // 최소 높이 안전장치 (너무 좁아도 최소 150px은 확보하거나, 상황에 맞게 조정)
      if (calculatedMaxHeight < 150) {
        // 공간이 너무 협소할 경우에 대한 정책이 필요하면 여기서 처리
        // 예: calculatedMaxHeight = 150;
      }

      setStyle({ top, left, maxHeight: calculatedMaxHeight });
    }
  }, [isOpen, triggerRef, contentRef, sideOffset, align, side]);

  if (!isMounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={contentRef}
      // [수정] flex, flex-col, overflow-y-auto 추가
      // maxHeight를 넘어가는 컨텐츠는 스크롤 처리됨
      className={cn(
        'z-9999 absolute flex flex-col overflow-y-auto',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        className,
      )}
      style={{
        top: `${style.top}px`,
        left: `${style.left}px`,
        // [수정] 계산된 maxHeight 적용
        maxHeight: style.maxHeight ? `${style.maxHeight}px` : undefined,
      }}
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

// ----------------------------------------------------------------------
// Exports
// ----------------------------------------------------------------------

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.MenuContainer = PopoverMenuContainer;
Popover.MenuItem = PopoverMenuItem;

export default Popover;
