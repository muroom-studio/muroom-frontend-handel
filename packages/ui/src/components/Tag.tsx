import { LabelHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

type TagVariant =
  | 'primary'
  | 'secondary'
  | 'blue'
  | 'neutral'
  | 'red'
  | 'outline';

type TagSize = 'm' | 's';

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
    'inline-flex items-center justify-center rounded-4 px-2 py-[6px] text-base-s-12-2';

  const styles: Record<
    TagVariant,
    Partial<Record<TagSize | 'base', string>>
  > = {
    primary: {
      base: 'bg-primary-400 text-white',
      s: 'text-base-exs-10 px-1 py-[6px] text-white!',
    },
    secondary: {
      base: 'bg-gray-700 text-white',
      s: 'text-base-exs-10 px-1 py-[6px] text-white!',
    },
    blue: {
      base: 'bg-blue-100 text-blue-500',
    },
    neutral: {
      base: 'bg-gray-100 text-gray-400',
    },
    red: {
      base: 'bg-red-100 text-red-400',
    },
    outline: {
      base: 'bg-white border-gray-300',
    },
  };

  const variantStyle = styles[variant]?.base || '';
  const sizeStyle = styles[variant]?.[size] || '';

  const finalClassName = cn(baseStyle, variantStyle, sizeStyle, propsClassName);

  return (
    <label className={finalClassName.trim() + ' text-base-s-12-2'} {...props}>
      {children}
    </label>
  );
};

export default Tag;
