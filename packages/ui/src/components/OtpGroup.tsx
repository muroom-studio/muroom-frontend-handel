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
      className={cn('grid gap-[10.4px]', className)}
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
          hideClearButton={true}
          className='min-w-0 flex-1'
          inputClassName={cn(
            'h-[48px] text-center p-0',
            'focus:border-primary-300 focus:ring-1 focus:ring-primary-600',
          )}
          inputMode='numeric'
          maxLength={1}
          autoComplete='one-time-code'
        />
      ))}
    </div>
  );
};

export default OtpGroup;
