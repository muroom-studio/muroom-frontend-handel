'use client';

import { useState } from 'react';

import { cn } from '@muroom/lib';

import { DownArrowIcon } from '@muroom/icons';
import { Popover } from '@muroom/components';

import {
  BuildingTypeFilter,
  InstrumentFilter,
  OptionFilter,
  PriceFilter,
  SizeFilter,
} from './variants';

export type Variant = 'e1' | 'e2' | 'e3' | 'e4' | 'e5';

const VARIANT_MAP: Record<Variant, string> = {
  e1: '가격',
  e2: '사이즈',
  e3: '옵션',
  e4: '건물 유형',
  e5: '악기',
};

const COMPONENT_MAP: Record<Variant, React.ComponentType> = {
  e1: PriceFilter,
  e2: SizeFilter,
  e3: OptionFilter,
  e4: BuildingTypeFilter,
  e5: InstrumentFilter,
};

interface Props {
  variant: Variant;
  value: string; // 일단 임시로 string
}

export default function FilterItem({ variant }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const ContentComponent = COMPONENT_MAP[variant];

  return (
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
            'rounded-4 text-base-l-16-1 flex-center gap-x-micro-2 w-full cursor-pointer border border-gray-300 bg-white px-4 py-3',
            'hover:bg-gray-50',
            'data-[state=open]:border-primary-400 data-[state=open]:text-primary-600',
          )}
        >
          <span>{VARIANT_MAP[variant]}</span>
          <DownArrowIcon className='rotate-0 transition-transform duration-200 group-data-[state=open]:rotate-180' />
        </button>
      </Popover.Trigger>
      <Popover.Content align='start'>
        <div className='rounded-4 shadow-level-0 w-[375px] border border-gray-300 bg-white p-5'>
          <ContentComponent />
        </div>
      </Popover.Content>
    </Popover>
  );
}
