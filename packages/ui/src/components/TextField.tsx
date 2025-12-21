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
  hideClearButton?: boolean; // 이미 존재하는 옵션 (true일 경우 닫기 버튼 숨김)
  ref?: Ref<HTMLInputElement>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode; // [New] 우측 아이콘 추가
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
  rightIcon, // [New] destructuring
  label,
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

  // 값이 있고, 비활성화 상태가 아니며, 숨김 옵션이 켜져있지 않을 때만 X버튼 노출
  const showClearIcon = !!displayValue && !props.disabled && !hideClearButton;

  // 우측 요소 존재 여부 체크 (패딩 계산용)
  const hasRightContent = showClearIcon || !!rightIcon;
  const hasBothRightContent = showClearIcon && !!rightIcon;

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
    let newValue = e.target.value;

    if (maxLength && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
      e.target.value = newValue;
    }

    if (!isControlled) {
      setInternalValue(newValue);
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
        {/* [Left Icon] */}
        {leftIcon && (
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
            {leftIcon}
          </div>
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
            'rounded-4 w-full border border-gray-300 p-3 transition-all',
            'text-base-l-16-1',
            {
              'pl-12': !!leftIcon, // 왼쪽 아이콘이 있으면 왼쪽 패딩 추가

              // [Padding Logic] 오른쪽 요소 구성에 따른 패딩 조절
              'pr-5': !hasRightContent, // 아무것도 없을 때 (기본)
              'pr-12': hasRightContent && !hasBothRightContent, // 하나만 있을 때
              'pr-20': hasBothRightContent, // 둘 다 있을 때 (여유 공간 확보)
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
