'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';

import { cn } from '../lib/utils';
import { BottomDotIcon } from '../icons-generated';

type DropdownItemProps = React.ComponentPropsWithRef<'button'> & {
  value: string;
};

interface DropdownContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: string | undefined;
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
  onValueChange,
  defaultValue,
  placeholder,
  className,
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const setSelected = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
      setIsOpen(false);
    },
    [isControlled, onValueChange],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      selectedValue: value,
      setSelected,
      placeholder,
      triggerRef,
      contentRef,
    }),
    [isOpen, value, setSelected, placeholder],
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div ref={containerRef} className={cn('relative w-full', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

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
  const { isOpen, setIsOpen, selectedValue, placeholder, triggerRef } =
    useDropdown();

  const composedRef = (el: HTMLButtonElement) => {
    (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current =
      el;
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
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
      {selectedValue ? selectedValue : placeholder || '선택...'}
      <BottomDotIcon className='rotate size-5 transition-transform duration-200 group-data-[state=open]:rotate-180' />
    </button>
  );
}

function DropdownContent({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const { isOpen, contentRef, triggerRef } = useDropdown();

  const composedRef = (el: HTMLDivElement) => {
    (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={composedRef}
      role='listbox'
      className={cn(
        'rounded-4 shadow-level-0 absolute top-full z-50 mt-2 w-full border border-gray-300 bg-white',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className,
      )}
      style={{
        minWidth: triggerRef.current?.offsetWidth,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

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
