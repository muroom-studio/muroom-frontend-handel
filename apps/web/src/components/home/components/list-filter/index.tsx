'use client';

import { useState } from 'react';

import { Popover } from '@muroom/components';
import { BottomDotIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export const SORT_MAP: Record<string, string> = {
  '': '선택',
  'latest,desc': '최신순',
  'price,desc': '높은가격순',
  'price,asc': '낮은가격순',
};

const SORT_CODES = Object.keys(SORT_MAP);

interface Props {
  studioNum: number;
  currentSort: string | null;
  onSortChange: (sortCode: string | null) => void;
}

export default function ListFilter({
  studioNum,
  currentSort,
  onSortChange,
}: Props) {
  const { isMobile } = useResponsiveLayout();

  const [isOpen, setIsOpen] = useState(false);

  const currentLabel = currentSort ? SORT_MAP[currentSort] : SORT_MAP[''];

  return (
    <div
      className={cn('flex-between h-14 border-b border-b-gray-300 p-4', {
        'px-0 py-4': isMobile,
      })}
    >
      <span className='text-base-exl-18-2 text-black'>{studioNum}개</span>
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
                'text-base-l-16-2': currentSort,
              },
            )}
          >
            <span>{currentLabel}</span>
            <BottomDotIcon className='size-5 rotate-0 transition-transform duration-200 group-data-[state=open]:rotate-180' />
          </button>
        </Popover.Trigger>
        <Popover.Content align='end'>
          <div className='rounded-4 shadow-level-0 overflow-hidden border border-gray-300 bg-white'>
            {SORT_CODES.map((code) => {
              const isSelected =
                (currentSort === null && code === '') || code === currentSort;

              return (
                <button
                  key={code}
                  onClick={() => {
                    onSortChange(code === '' ? null : code);
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
                  {SORT_MAP[code]}
                </button>
              );
            })}
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
}
