'use client';

import { HTMLAttributes } from 'react';

import { CheckSmallIcon, CloseIcon } from '../icons-generated';
import { cn } from '../lib/utils';

interface HelperMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: 'default' | 'error' | 'success';
  showIcon?: boolean;
  className?: string;
}

const HelperMessage = ({
  children,
  variant = 'default',
  showIcon = false,
  className,
  ...props
}: HelperMessageProps) => {
  if (!children) {
    return null;
  }

  const variantConfig = {
    default: {
      color: 'text-gray-800',
      icon: null,
    },
    success: {
      color: 'text-blue-400',
      icon: <CheckSmallIcon className='size-4' />,
    },
    error: {
      color: 'text-red-400',
      icon: <CloseIcon className='size-3.5' />,
    },
  };

  const { color, icon } = variantConfig[variant];

  return (
    <p
      className={cn(
        'text-base-s-12-1 flex items-center gap-x-0.5',
        color,
        className,
      )}
      {...props}
    >
      {showIcon && icon && <span>{icon}</span>}
      <span>{children}</span>
    </p>
  );
};

export default HelperMessage;
