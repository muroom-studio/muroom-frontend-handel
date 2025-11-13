'use client';

import { InputHTMLAttributes, useState, ChangeEvent, Ref } from 'react';

import { CloseIcon } from '../icons-generated';

import { cn } from '../lib/utils';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  label?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
  leftIcon?: React.ReactNode;
}

export default function TextField({
  className,
  onClear,
  label,
  value,
  defaultValue,
  onChange,
  type,
  ref,
  leftIcon,
  ...props
}: TextFieldProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const displayValue = isControlled ? value : internalValue;

  const showClearIcon = !!displayValue && !props.disabled;

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
    if (!isControlled) {
      setInternalValue('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <div className={cn('w-full', className)}>
      <div className='relative'>
        {leftIcon && (
          <div className='absolute left-3 top-1/2 -translate-y-1/2'>
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          disabled={props.disabled}
          className={cn(
            'rounded-4 text-base-l-16-1 w-full border border-gray-300 p-3 text-gray-800 transition-all',
            {
              'pr-12': showClearIcon,
              'pr-5': !showClearIcon,
              'pl-12': leftIcon,
            },
            'placeholder:text-gray-400',
            'focus:border-primary-400 focus:outline-none',
            {
              'bg-surface2 border-text-box !text-text-line cursor-not-allowed':
                props.disabled,
            },
          )}
          {...props}
        />

        <div className='absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-x-2'>
          <button
            type='button'
            onClick={handleClear}
            aria-label={'입력 내용 지우기'}
            className={cn('size-6 transition-all', {
              hidden: !showClearIcon,
            })}
            disabled={!showClearIcon}
          >
            <CloseIcon className='size-full text-gray-400' />
          </button>
        </div>
      </div>
    </div>
  );
}
