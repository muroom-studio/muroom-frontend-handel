import { LabelHTMLAttributes } from 'react';

import { cn } from '../lib/utils';

type TagVariant =
  | 'primary'
  | 'secondary'
  | 'blue'
  | 'neutral'
  | 'red'
  | 'outline'
  | 'musician'
  | 'owner';

type TagSize = 'l' | 'm' | 's';

interface TagProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: TagVariant;
  size?: TagSize;
  className?: string;
  children: React.ReactNode;
}

const Tag = ({
  variant = 'neutral',
  size = 'm',
  className: propsClassName,
  children,
  ...props
}: TagProps) => {
  const baseStyle =
    'inline-flex shrink-0 items-center justify-center rounded-4 px-2 py-[6px]';

  const defaultFontStyle = 'text-base-s-12-2';

  const styles: Record<
    TagVariant,
    Partial<Record<TagSize | 'base', string>>
  > = {
    primary: {
      base: 'bg-primary-400 !text-white',
      l: 'text-base-m-14-2 px-2 py-[9px] !text-white',
      s: 'text-base-exs-10-1 px-1 py-[6px] !text-white',
    },
    secondary: {
      base: 'bg-gray-700 !text-white',
      s: 'text-base-exs-10-1 px-1 py-[6px] !text-white',
    },
    blue: {
      base: 'bg-blue-100 !text-blue-500',
    },
    neutral: {
      base: 'bg-gray-100 !text-gray-400',
    },
    red: {
      base: 'bg-red-100 !text-red-400',
    },
    outline: {
      base: 'bg-white border border-gray-300',
    },
    musician: {
      base: 'bg-primary-500 !text-white text-base-s-12-2 px-[6px] py-1',
    },
    owner: {
      base: 'bg-gray-800 !text-white text-base-s-12-2 px-2 py-1',
    },
  };

  const variantStyle = styles[variant]?.base || '';
  const sizeStyle = styles[variant]?.[size] || '';

  const hasCustomFont = sizeStyle.includes('text-base-');

  const finalClassName = cn(
    baseStyle,
    variantStyle,
    hasCustomFont ? '' : defaultFontStyle,
    sizeStyle,
    propsClassName,
  );

  return (
    <label className={finalClassName} {...props}>
      {children}
    </label>
  );
};

export default Tag;
