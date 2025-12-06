'use client';

import { ChangeEvent, InputHTMLAttributes, Ref, useId, useState } from 'react';

import { CloseIcon } from '../icons-generated';
import { cn } from '../lib/utils';
import RequiredText from './RequiredText';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  label?: string;
  className?: string;
  inputClassName?: string;
  hideClearButton?: boolean;
  ref?: Ref<HTMLInputElement>;
  leftIcon?: React.ReactNode;
}

const TextField = ({
  className,
  inputClassName,
  hideClearButton = false,
  onClear,
  value,
  defaultValue,
  onChange,
  ref,
  leftIcon,
  label,
  id,
  required,
  ...props
}: TextFieldProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const displayValue = isControlled ? value : internalValue;

  const showClearIcon = !!displayValue && !props.disabled && !hideClearButton;

  const handleClear = (e: any) => {
    if (onClear) {
      e.preventDefault();
      e.stopPropagation();
      onClear();
    }
    if (!isControlled) {
      e.preventDefault();
      e.stopPropagation();
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
    <div
      className={cn('w-full', label && 'flex flex-col gap-y-[9px]', className)}
    >
      {label && (
        <RequiredText htmlFor={inputId} required={required}>
          {label}
        </RequiredText>
      )}

      <div className='relative'>
        {leftIcon && (
          <div className='absolute left-3 top-1/2 -translate-y-1/2'>
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          value={displayValue}
          onChange={handleChange}
          disabled={props.disabled}
          className={cn(
            'rounded-4 w-full border border-gray-300 p-3 transition-all',
            'text-base-l-16-1',
            {
              'pr-12': showClearIcon,
              'pr-5': !showClearIcon,
              'pl-12': leftIcon,
            },
            'placeholder:text-gray-400',
            'focus:border-gray-800 focus:outline-none',
            {
              'cursor-not-allowed border-gray-300 bg-gray-50 !text-gray-400':
                props.disabled,
            },
            inputClassName,
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
            <CloseIcon className='size-full cursor-pointer text-gray-400' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextField;
