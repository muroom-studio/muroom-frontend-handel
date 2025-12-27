'use client';

import { LabelHTMLAttributes } from 'react';

import { cn } from '../lib/utils';

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  strongColor?: string;
  children: React.ReactNode;
}

const RequiredText = ({
  required = true,
  strongColor = 'text-primary-600',
  children,
  className,
  ...props
}: FormLabelProps) => {
  return (
    <label
      className={cn(
        'flex w-fit items-center gap-x-1 text-black',
        {
          'cursor-pointer': props.id,
        },
        'text-base-exl-18-2',
        className,
      )}
      {...props}
    >
      {required && <span className={strongColor}>*</span>}
      {children}
    </label>
  );
};

export default RequiredText;
