'use client';

import {
  ChangeEvent,
  ComponentProps,
  TextareaHTMLAttributes,
  useState,
} from 'react';

import { cn } from '../lib/utils';
import HelperMessage from './HelperMessage';

interface TextBoxProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  bottomContent?: React.ReactNode;
  helperMessage?: ComponentProps<typeof HelperMessage>;
  containerClassName?: string;
  textareaClassName?: string;
}

const TextBox = ({
  id,
  className,
  containerClassName,
  textareaClassName,
  bottomContent,
  helperMessage,
  disabled,
  value,
  defaultValue,
  maxLength = 400,
  minLength,
  onChange,
  ...props
}: TextBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const [isMinLengthError, setIsMinLengthError] = useState(false);

  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<string>(
    (defaultValue as string) || '',
  );

  const currentValue = isControlled ? (value as string) : internalValue;
  const currentLength = currentValue.length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(e);

    if (isMinLengthError && minLength && newValue.length >= minLength) {
      setIsMinLengthError(false);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);

    if (minLength && currentLength > 0 && currentLength < minLength) {
      setIsMinLengthError(true);
    } else {
      setIsMinLengthError(false);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const displayHelperMessage = isMinLengthError
    ? {
        variant: 'error' as const,
        children: `최소 ${minLength}자 이상 입력해주세요.`,
        showIcon: false,
        className: helperMessage?.className,
      }
    : helperMessage;

  return (
    <div className={cn('flex flex-col gap-y-2', className, containerClassName)}>
      <div
        className={cn(
          'rounded-4 relative flex cursor-pointer flex-col border bg-white transition-all',
          'border-gray-300',
          'hover:shadow-level-0',
          isFocused && 'border-gray-600',
        )}
      >
        <textarea
          id={id}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            'w-full resize-none bg-transparent px-4 py-5',
            'min-h-44',
            'text-base-l-16-1 placeholder:text-gray-400 focus:outline-none',
            textareaClassName,
          )}
          {...props}
        />

        <div className='flex flex-col gap-y-2 px-4 pb-5 pt-2'>
          <div className='text-base-s-12-1 flex justify-end text-gray-400'>
            <span
              className={cn(
                'text-base-s-12-2 text-gray-800',
                currentLength === 0 && 'text-gray-400',
              )}
            >
              {currentLength}
            </span>
            /{maxLength}
          </div>

          {bottomContent && <div className='w-full'>{bottomContent}</div>}
        </div>
      </div>

      {displayHelperMessage && <HelperMessage {...displayHelperMessage} />}
    </div>
  );
};

export default TextBox;
