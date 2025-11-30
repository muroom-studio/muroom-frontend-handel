'use client';

import { useState } from 'react';

import { Popover } from '@muroom/components';
import { BottomDotIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

const SORT_OPTIONS = [
  '선택',
  '추천순',
  '최신순',
  '리뷰많은순',
  '평점높은순',
  '높은가격순',
  '낮은가격순',
];

export default function ListFilter() {
  const { isMobile } = useResponsiveLayout();

  const [selectedOption, setSelectedOption] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={cn('flex-between h-14 border-b border-b-gray-300 p-4', {
        'px-0 py-4': isMobile,
      })}
    >
      <span className='text-base-exl-18-2 text-black'>75개</span>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>
          <button
            type='button'
            data-state={isOpen ? 'open' : 'closed'}
            aria-haspopup='menu'
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className={cn(
              'group',
              'flex-center rounded-4 text-base-l-16-1 w-full max-w-[202px] cursor-pointer gap-x-1 truncate p-1 transition-all',
              {
                'bg-gray-100': isOpen,
                'text-base-l-16-2': selectedOption,
              },
            )}
          >
            <span>{selectedOption || '전체'}</span>
            <BottomDotIcon className='size-5 rotate-0 transition-transform duration-200 group-data-[state=open]:rotate-180' />
          </button>
        </Popover.Trigger>
        <Popover.Content align='end'>
          <div className='rounded-4 shadow-level-0 border border-gray-300 bg-white'>
            {SORT_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
                className={cn(
                  'text-base-m-14-1 relative flex w-full cursor-pointer select-none items-center border-b border-gray-200 bg-white px-3 py-[9px] outline-none transition-all',
                  'hover:bg-gray-100 disabled:cursor-default disabled:text-gray-300',
                  {
                    '!text-primary-600 text-base-m-14-2 hover:bg-gray-50':
                      option === selectedOption,
                  },
                  'first: rounded-t-4',
                  'last: rounded-b-4 last:border-b-0',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
}
