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
    // 숫자가 아니면 무시 (옵션)
    if (!/^\d*$/.test(val)) return;

    // ✅ [핵심 수정] 1글자 이상 입력됨 (붙여넣기 또는 모바일 자동완성 감지)
    if (val.length > 1) {
      // 1. 입력된 값을 최대 길이(length)만큼만 자름
      const pastedData = val.split('').slice(0, length);
      const newOtp = [...value];

      // 2. 현재 포커스된 인덱스부터 순차적으로 채워넣음
      pastedData.forEach((char, i) => {
        if (index + i < length) {
          newOtp[index + i] = char;
        }
      });

      onChange(newOtp);

      // 3. 입력이 끝난 다음 칸으로 포커스 이동 (마지막 칸이면 그대로 유지)
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
          hideClearButton={true}
          className='min-w-0 flex-1'
          inputClassName={cn('h-[48px] text-center p-0')}
          inputMode='numeric'
          maxLength={length}
          autoComplete='one-time-code'
        />
      ))}
    </div>
  );
};

export default OtpGroup;
