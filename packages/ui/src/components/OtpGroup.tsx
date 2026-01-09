'use client';

import { useEffect, useRef } from 'react';

import { cn } from '../lib/utils';
import TextField from './TextField';

interface Props {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

const OtpGroup = ({ length = 6, value, onChange, className }: Props) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    if (val.length > 1) {
      const pastedData = val.split('').slice(0, length);
      const newOtp = [...value];

      pastedData.forEach((char, i) => {
        if (index + i < length) {
          newOtp[index + i] = char;
        }
      });

      onChange(newOtp);

      const nextFocusIndex = Math.min(index + pastedData.length, length - 1);
      inputRefs.current[nextFocusIndex]?.focus();
      return;
    }

    const newOtp = [...value];
    newOtp[index] = val.slice(-1);
    onChange(newOtp);

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div
      className={cn('grid items-center gap-[10.4px]', className)}
      style={{
        gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length }).map((_, index) => (
        <TextField
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          hideClearButton
          inputClassName='py-0 size-full text-center'
          inputWrapperClassName='p-0 text-center h-12 pl-2'
          inputMode='numeric'
          maxLength={length}
          autoComplete='one-time-code'
        />
      ))}
    </div>
  );
};

export default OtpGroup;
