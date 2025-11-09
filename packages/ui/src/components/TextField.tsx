'use client';

import { InputHTMLAttributes, useId, useState, ChangeEvent, Ref } from 'react';
import clsx from 'clsx';

import { CloseIcon } from '../icons-generated';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  label?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
  iconLeft?: React.ReactNode;
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
  iconLeft,
  ...props
}: Props) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const displayValue = isControlled ? value : internalValue;

  const showClearIcon = !!displayValue && !props.disabled;

  const uniqueId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordInput = type === 'password';

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
    <div className={clsx('w-full', className)}>
      {label && (
        <label
          htmlFor={uniqueId}
          className='text-body-s2 text-text1 mb-2 block'
        >
          {label}
        </label>
      )}
      <div className='relative'>
        {iconLeft && (
          <div className='absolute left-5 top-1/2 -translate-y-1/2'>
            {iconLeft}
          </div>
        )}
        <input
          ref={ref}
          id={uniqueId}
          type={
            isPasswordInput ? (isPasswordVisible ? 'text' : 'password') : type
          }
          value={displayValue}
          onChange={handleChange}
          disabled={props.disabled}
          className={clsx(
            'rounded-M border-text-box-var text-body-l1 text-text2 w-full border py-4 pl-5 transition-all',
            { 'pl-[50]': !!iconLeft, 'pl-5': !iconLeft },
            {
              'pr-20': isPasswordInput && showClearIcon,
              'pr-12': !isPasswordInput && showClearIcon,
              'pr-5': !showClearIcon,
            },
            'placeholder:text-text-line',
            'hover:bg-surface2 hover:border-text-line hover:cursor-text',
            'focus:bg-surface1 focus:border-text2 focus:outline-none',
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
            className={clsx('size-6 transition-all', {
              hidden: !showClearIcon,
            })}
            disabled={!showClearIcon}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
