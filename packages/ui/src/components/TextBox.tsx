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
  onChange,
  ...props
}: TextBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<string>(
    (defaultValue as string) || '',
  );

  const currentValue = isControlled ? (value as string) : internalValue;
  const currentLength = currentValue.length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

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
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
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

          {/* 외부 주입 하단 컨텐츠 (버튼셋 등) */}
          {bottomContent && <div className='w-full'>{bottomContent}</div>}
        </div>
      </div>

      {/* 3. 헬퍼 메시지 렌더링 */}
      {helperMessage && (
        <HelperMessage
          {...helperMessage}
          className={cn('', helperMessage.className)}
        />
      )}
    </div>
  );
};

export default TextBox;
