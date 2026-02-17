'use client';

import { useState } from 'react';

import { Popover } from '@muroom/components';
import { BottomDotIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

export interface SortOption {
  label: string;
  value: string;
}

interface Props {
  currentSort: string | null;
  onSortChange: (value: string) => void;
  options: SortOption[];
  placeholder?: string;
  className?: string;
}

export default function ListSortFilter({
  currentSort,
  onSortChange,
  options,
  placeholder = '선택',
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel =
    options.find((opt) => opt.value === (currentSort ?? ''))?.label ||
    placeholder;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <button
          type='button'
          data-state={isOpen ? 'open' : 'closed'}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'group',
            'flex-center rounded-4 text-base-l-16-1 w-full max-w-[202px] cursor-pointer gap-x-1 truncate p-1 transition-all',
            {
              'bg-gray-100': isOpen,
              'text-base-l-16-2': currentSort && currentSort !== '',
            },
            className,
          )}
        >
          <span>{currentLabel}</span>
          <BottomDotIcon className='size-5 rotate-0 transition-transform duration-200 group-data-[state=open]:rotate-180' />
        </button>
      </Popover.Trigger>

      <Popover.Content align='start' side='bottom' sideOffset={4}>
        <div className='rounded-4 shadow-level-0 overflow-hidden border border-gray-300 bg-white'>
          {options.map((option) => {
            const isSelected =
              (currentSort === null && option.value === '') ||
              option.value === currentSort;

            return (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'text-base-m-14-1 relative flex w-full cursor-pointer select-none items-center border-b border-gray-200 bg-white px-3 py-[9px] outline-none transition-all',
                  'hover:bg-gray-100',
                  {
                    '!text-primary-600 text-base-m-14-2 hover:bg-gray-50':
                      isSelected,
                  },
                  'last:border-b-0',
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </Popover.Content>
    </Popover>
  );
}
