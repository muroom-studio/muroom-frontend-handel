'use client';

import { ChangeEvent, InputHTMLAttributes, Ref, useId, useState } from 'react';

import { CloseIcon } from '../icons-generated';
import { cn } from '../lib/utils';
import RequiredText from './RequiredText';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  label?: string;
  customLabel?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  hideClearButton?: boolean;
  ref?: Ref<HTMLInputElement>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputPrefix?: React.ReactNode;
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
  rightIcon,
  inputPrefix,
  label,
  customLabel,
  id,
  required,
  maxLength,
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
      setInternalValue('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
      e.target.value = newValue;
    }
    if (!isControlled) setInternalValue(newValue);
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

      {customLabel && <label htmlFor={inputId}>{customLabel}</label>}

      <div
        className={cn(
          'rounded-4 relative flex items-center border bg-white px-3 transition-all',
          'border-gray-300 focus-within:border-gray-800',
          props.disabled && 'cursor-not-allowed border-gray-300 bg-gray-50',
        )}
      >
        {leftIcon && (
          <div className='mr-2 shrink-0 text-gray-400'>{leftIcon}</div>
        )}

        {inputPrefix && (
          <div className='mr-1.5 shrink-0 select-none'>{inputPrefix}</div>
        )}

        <input
          ref={ref}
          id={inputId}
          required={required}
          value={displayValue}
          onChange={handleChange}
          maxLength={maxLength}
          disabled={props.disabled}
          className={cn(
            'text-base-l-16-1 min-w-0 flex-1 bg-transparent py-3 placeholder:text-gray-400 focus:outline-none',
            props.disabled && 'cursor-not-allowed !text-gray-400',
            inputClassName,
          )}
          {...props}
        />

        <div className='ml-2 flex flex-shrink-0 items-center gap-x-2'>
          <button
            type='button'
            onClick={handleClear}
            aria-label={'입력 내용 지우기'}
            className={cn('size-6 transition-all', {
              hidden: !showClearIcon,
              block: showClearIcon,
            })}
            disabled={!showClearIcon}
          >
            <CloseIcon className='size-full cursor-pointer text-gray-400' />
          </button>

          {rightIcon && (
            <div className='flex items-center justify-center text-gray-400'>
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextField;
