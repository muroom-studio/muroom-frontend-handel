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
import { DownArrowIcon } from '../icons-generated';

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
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
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
    (newValue: string, newLabel: React.ReactNode) => {
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
      <div ref={containerRef} className='relative w-full'>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownTrigger({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<'button'>) {
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

  return (
    <button
      type='button'
      ref={composedRef}
      data-state={isOpen ? 'open' : 'closed'}
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      onClick={() => setIsOpen((prev) => !prev)}
      className={cn(
        'group',
        'rounded-M border-text-box-var text-body-l1 flex w-full cursor-pointer items-center justify-between border bg-white px-5 py-4',
        'focus:shadow-modal-l',
        'data-[state=open]:rounded-b-none',
        className,
      )}
      {...props}
    >
      {selectedValue ? selectedValue : placeholder || '선택...'}
      <DownArrowIcon className='group-data-[state=open]:rotate-270 rotate-90 transition-transform duration-200' />
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
        'rounded-M text-body-l1 shadow-modal-l border-text-box-var absolute z-50 flex w-full min-w-[var(--radix-select-trigger-width)] flex-col gap-y-2 rounded-t-none border border-t-0 bg-white p-2',
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

  console.log(isSelected, 'isSelected');

  return (
    <button
      type='button'
      ref={ref}
      role='option'
      aria-selected={isSelected}
      data-selected={isSelected ? 'true' : undefined}
      onClick={() => setSelected(value, children)}
      className={cn(
        'text-body-l1 rounded-S relative flex w-full cursor-pointer select-none items-center p-4 outline-none',
        'hover:bg-surface2',
        'data-[selected=true]:bg-text2 data-[selected=true]:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem };
