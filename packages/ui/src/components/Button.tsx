'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib/utils';

// Props 타입 정의
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'primary_icon'
  | 'outline_icon'
  | 'text'
  | 'danger';

type ButtonSize = 'xl' | 'l' | 'm' | 's' | 'xs';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'm',
  children,
  className: propsClassName,
  ...props
}: ButtonProps) => {
  const baseStyle =
    'inline-flex items-center justify-center gap-1 cursor-pointer shrink-0 border-1 whitespace-nowrap rounded-4 transition-all disabled:cursor-default';

  const styles: Record<
    ButtonVariant,
    Partial<Record<ButtonSize | 'base', string>>
  > = {
    primary: {
      base: `
          !text-white bg-primary-600 border-none
          hover:bg-primary-700
          active:bg-primary-800
          disabled:bg-gray-200 disabled:!text-gray-400
        `,
      xl: 'px-4 py-[18px] text-base-l-16-2',
      l: 'p-3 text-base-l-16-2',
      m: 'px-3 py-[9px] text-base-m-14-2',
    },
    secondary: {
      base: `
          !text-white bg-gray-700
          hover:bg-gray-800
          active:bg-gray-900
          disabled:bg-gray-200 disabled:text-gray-400
        `,
      m: 'px-3 py-[9px] text-base-m-14-2',
      s: 'px-3 py-[5px] text-base-m-14-1',
    },
    outline: {
      base: `
          bg-white border-gray-300
          hover:bg-gray-100
          active:bg-gray-200
          disabled:bg-gray-200 disabled:text-gray-400
        `,
      xl: 'px-4 py-[18px] text-base-l-16-2',
      l: 'p-3 text-base-l-16-2',
      m: 'px-3 py-[9px] text-base-m-14-2',
      s: 'px-3 py-[5px] text-base-m-14-1',
      xs: 'px-2 py-[3px] text-base-m-14-1',
    },
    primary_icon: {
      base: `
          bg-primary-500 border-gray-300 w-14 h-14
          hover:bg-primary-600
          active:bg-primary-700
          disabled:bg-gray-300 disabled:border-gray-300
        `,
    },
    outline_icon: {
      base: `
          bg-white border-gray-300
          hover:bg-gray-100
          active:bg-gray-200
          disabled:bg-gray-100
        `,
      xl: 'w-14 h-14',
      l: 'w-11 h-11',
      xs: 'w-6 h-6',
    },
    text: {
      base: `
        border-none text-base-s-12-1 text-gray-600 p-0 
      `,
    },
    danger: {
      base: `
        bg-red-400 !text-base-l-16-2 !text-white px-4 py-[18px]
        hover:bg-red-500
        active:bg-red-600
        disabled:bg-gray-200 text-gray-400
      `,
    },
  };

  const variantStyle = styles[variant]?.base || '';
  const sizeStyle = styles[variant]?.[size] || '';

  const finalClassName = cn(baseStyle, variantStyle, sizeStyle, propsClassName);

  return (
    <button className={finalClassName.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;
