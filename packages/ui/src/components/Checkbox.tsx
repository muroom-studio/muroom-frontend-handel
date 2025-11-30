'use client';

import { InputHTMLAttributes } from 'react';

import { CheckSmallIcon } from '../icons-generated';
import { cn } from '../lib/utils';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

const Checkbox = ({ label, className, checked, ...props }: CheckboxProps) => {
  const isTextLabel = typeof label === 'string' || typeof label === 'number';

  return (
    <label
      className={cn(
        'group inline-flex w-fit cursor-pointer items-center gap-x-2',
        className,
      )}
    >
      <input type='checkbox' className='sr-only' checked={checked} {...props} />

      <div
        className={cn(
          'flex-center rounded-4 size-6 border px-1.5 py-[7px] transition-all',
          checked && 'bg-primary-600 border-primary-300',
          !checked && 'border-gray-300 bg-white',
          !checked &&
            'group-hover:bg-primary-100 group-hover:border-primary-300',
        )}
      >
        <CheckSmallIcon
          className={cn(
            'transition-all',
            checked && 'text-white',
            !checked && 'text-gray-300',
            !checked && 'group-hover:text-primary-500',
          )}
        />
      </div>

      {label && (
        <>
          {isTextLabel ? (
            <span
              className={cn(
                'text-body-s2 select-none transition-colors',
                checked ? 'text-primary-box font-medium' : 'text-text1',
              )}
            >
              {label}
            </span>
          ) : (
            label
          )}
        </>
      )}
    </label>
  );
};

export default Checkbox;
