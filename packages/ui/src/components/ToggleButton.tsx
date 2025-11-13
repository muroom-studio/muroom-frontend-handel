'use client';

import {
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type Ref,
  type ReactNode,
} from 'react';
import { cn } from '../lib/utils';

type ToggleVariant = 'outline' | 'outline_icon' | 'text';
type ToggleSize = 'xl' | 'l' | 'm' | 's';

export interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  ref?: Ref<HTMLButtonElement>;
  children: ReactNode;
}

const ToggleButton = ({
  className: propsClassName,
  variant = 'outline',
  size = 'm',
  selected: controlledSelected,
  defaultSelected = false,
  onSelectedChange,
  onClick,
  ref,
  children,
  ...props
}: ToggleProps) => {
  const [uncontrolledSelected, setUncontrolledSelected] =
    useState(defaultSelected);
  const isControlled = controlledSelected !== undefined;
  const isSelected = isControlled ? controlledSelected : uncontrolledSelected;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (!isControlled) {
      setUncontrolledSelected((prev) => !prev);
    }
    onSelectedChange?.(!isSelected);
  };

  const baseStyle =
    'rounded-4 inline-flex cursor-pointer items-center justify-center gap-x-1 whitespace-nowrap outline-none transition-all duration-200 disabled:cursor-default';

  const styles: Partial<
    Record<ToggleVariant, Partial<Record<ToggleSize | 'base', string>>>
  > = {
    outline: {
      base: `
        active:border-primary-600 active:bg-primary-200 border border-gray-300 bg-white hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400
        ${isSelected && 'bg-primary-50 border-primary-600 hover:bg-primary-100'}
      `,
      xl: 'text-base-m-14-2 px-9 py-[19px]',
      l: `!text-base-s-12-2 px-[8px] py-[14px] ${isSelected ? 'text-primary-600' : ''}`,
      m: `${isSelected ? 'text-base-m-14-2 bg-primary-400 hover:bg-primary-500 !text-white' : 'text-base-m-14-1'} px-3 py-[9px]`,
    },
    outline_icon: {
      base: `
        w-9 h-9 border border-gray-300 bg-white hover:bg-gray-100
        ${isSelected && 'bg-primary-50 border-primary-600 hover:border-gray-300 hover:!bg-primary-100 text-primary-600'}
      `,
    },
    text: {
      base: `
        text-gray-400
        ${isSelected && 'text-gray-800'}
      `,
      m: `${isSelected ? 'text-base-l-16-2' : 'text-base-l-16-1'}`,
      s: `${isSelected ? 'text-base-l-14-2' : 'text-base-l-14-1'}`,
    },
  };

  const variantStyle = styles[variant]?.base || '';
  const sizeStyle =
    (styles[variant] as Partial<Record<ToggleSize, string>>)?.[size] || '';

  const finalClassName = cn(baseStyle, variantStyle, sizeStyle, propsClassName);

  return (
    <button
      type='button'
      ref={ref}
      className={finalClassName}
      data-selected={isSelected ? 'true' : 'false'}
      aria-pressed={isSelected}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
