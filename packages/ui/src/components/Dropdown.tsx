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

import { DownArrowIcon } from '../icons-generated';
import { cn } from '../lib/utils';

type DropdownItemProps = React.ComponentPropsWithRef<'button'> & {
  value: string;
};

interface DropdownContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: string | undefined;
  selectedLabel: React.ReactNode | undefined;
  setSelected: (value: string, label: React.ReactNode) => void;
  placeholder?: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a <Dropdown />');
  }
  return context;
}

function Dropdown({
  value: controlledValue,
  label: controlledLabel,
  onValueChange,
  defaultValue,
  placeholder,
  className,
  children,
}: {
  value?: string;
  label?: React.ReactNode;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [selectedLabel, setSelectedLabel] = useState<React.ReactNode>(''); // 내부 라벨 상태

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const currentLabel =
    controlledLabel !== undefined ? controlledLabel : selectedLabel;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const setSelected = useCallback(
    (newValue: string, newLabel: React.ReactNode) => {
      if (value === newValue) {
        if (!isControlled) {
          setInternalValue('');
        }
        setSelectedLabel('');
        onValueChange?.('');
      } else {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        setSelectedLabel(newLabel);
        onValueChange?.(newValue);
      }
      setIsOpen(false);
    },
    [isControlled, onValueChange, value],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        contentRef.current &&
        !contentRef.current.contains(target)
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
  }, [isOpen]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      selectedValue: value,
      // ⭐️ 3. 결정된 currentLabel을 Context로 전달
      selectedLabel: currentLabel,
      setSelected,
      placeholder,
      triggerRef,
      contentRef,
    }),
    [isOpen, value, currentLabel, setSelected, placeholder],
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={cn('relative w-full', className)}>{children}</div>
    </DropdownContext.Provider>
  );
}

// ----------------------------------------------------------------------
// 2. DropdownTrigger
// ----------------------------------------------------------------------

type DropdownVariant = 'primary' | 'neutral' | 'text';
type DropdownSize = 'l' | 'm' | 's';

interface DropdownTriggerProps extends React.ComponentPropsWithRef<'button'> {
  variant?: DropdownVariant;
  size?: DropdownSize;
}

function DropdownTrigger({
  variant = 'primary',
  size = 's',
  className: propsClassName,
  ref,
  ...props
}: DropdownTriggerProps) {
  const {
    isOpen,
    setIsOpen,
    selectedValue,
    selectedLabel,
    placeholder,
    triggerRef,
  } = useDropdown();

  const composedRef = (el: HTMLButtonElement) => {
    (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current =
      el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  const baseStyle =
    'group flex-center gap-x-1 w-full cursor-pointer transition-all rounded-4 max-w-[202px] truncate';

  const styles: Record<
    DropdownVariant,
    Partial<Record<DropdownSize | 'base', string>>
  > = {
    primary: {
      base: `
        border border-gray-300 bg-white
        hover:bg-gray-50
        ${isOpen && 'bg-white border-primary-400 !text-primary-600'}
        ${selectedValue && `bg-primary-50 border-primary-400 hover:bg-primary-100 !text-primary-600 ${isOpen && 'bg-primary-100'}`}
      `,
      l: `px-4 py-3 text-base-l-16-1 ${selectedValue && 'text-base-l-16-2'}`,
      m: `px-3 py-[9px] text-base-m-14-1 ${selectedValue && 'text-base-m-14-2'}`,
      s: 'px-[6px] py-[5px] text-base-m-14-1',
    },
    neutral: {
      base: `
        border border-gray-300 bg-white text-base-m-14-1 px-[6px] py-[5px]
        hover:bg-gray-100
        ${isOpen && 'bg-gray-100 !border-gray-500'}
        ${selectedValue && '!border-gray-500 text-base-m-14-2'}
      `,
    },
    text: {
      base: `
        text-base-l-16-1 p-1
        ${isOpen && 'bg-gray-100'}
        ${selectedValue && 'text-base-l-16-2'}
      `,
    },
  };

  const variantStyle = styles[variant]?.base || '';
  const sizeStyle = styles[variant]?.[size] || '';
  const finalClassName = cn(baseStyle, variantStyle, sizeStyle, propsClassName);

  return (
    <button
      type='button'
      ref={composedRef}
      data-state={isOpen ? 'open' : 'closed'}
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      onClick={() => setIsOpen((prev) => !prev)}
      className={finalClassName}
      {...props}
    >
      {selectedValue ? selectedLabel : placeholder || '선택...'}
      <DownArrowIcon className='rotate size-5 transition-transform duration-200 group-data-[state=open]:rotate-180' />
    </button>
  );
}

// ----------------------------------------------------------------------
// 3. DropdownContent (with Portal)
// ----------------------------------------------------------------------

function DropdownContent({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const { isOpen, contentRef, triggerRef, setIsOpen } = useDropdown();

  const [coords, setCoords] = useState({ top: 0, left: 0, minWidth: 0 });

  const composedRef = (el: HTMLDivElement) => {
    (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const updatePosition = () => {
        const rect = triggerRef.current!.getBoundingClientRect();
        setCoords({
          top: rect.bottom + 8,
          left: rect.left,
          minWidth: rect.width,
        });
      };

      updatePosition();

      const handleScroll = (event: Event) => {
        if (
          contentRef.current &&
          contentRef.current.contains(event.target as Node)
        ) {
          return;
        }
        setIsOpen(false);
      };

      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', handleScroll, { capture: true });

      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', handleScroll, { capture: true });
      };
    }
  }, [isOpen, triggerRef, setIsOpen, contentRef]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={composedRef}
      role='listbox'
      className={cn(
        'rounded-4 shadow-level-0 fixed z-[9999] whitespace-nowrap border border-gray-300 bg-white',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className,
      )}
      style={{
        top: coords.top,
        left: coords.left,
        minWidth: coords.minWidth,
      }}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
}

// ----------------------------------------------------------------------
// 4. DropdownItem
// ----------------------------------------------------------------------

function DropdownItem({
  className,
  children,
  value,
  ref,
  ...props
}: DropdownItemProps) {
  const { selectedValue, setSelected } = useDropdown();
  const isSelected = selectedValue === value;

  return (
    <button
      type='button'
      ref={ref}
      role='option'
      aria-selected={isSelected}
      data-selected={isSelected ? 'true' : undefined}
      onClick={() => setSelected(value, children)}
      className={cn(
        'text-base-m-14-1 relative flex w-full cursor-pointer select-none items-center border-b border-gray-200 bg-white px-3 py-[9px] outline-none transition-all',
        'hover:bg-gray-100 disabled:cursor-default disabled:text-gray-300',
        {
          '!text-primary-600 text-base-m-14-2 hover:bg-gray-50': isSelected,
        },
        'last:border-b-0',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem };
