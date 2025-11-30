'use client';

import { useState } from 'react';

import { Button, ModalBottomSheet, Popover } from '@muroom/components';
import { DownArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useStudiosQueries } from '@/hooks/api/studios/useQueries';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

import {
  BuildingTypeFilter,
  OptionFilter,
  PriceFilter,
  SizeFilter,
} from './variants';

export type Variant = 'e1' | 'e2' | 'e3' | 'e4';

const VARIANT_MAP: Record<Variant, string> = {
  e1: '가격',
  e2: '사이즈',
  e3: '옵션',
  e4: '건물 유형',
};

interface Props {
  variant: Variant;
  value: string;
  onValueChange: (newValue: string) => void;
}

export default function FilterItem({ variant, value, onValueChange }: Props) {
  // 1. 서버 데이터 가져오기
  const { data } = useStudiosQueries().studioFilterOptionsQuery;

  const { isMobile } = useResponsiveLayout();
  const [isOpen, setIsOpen] = useState(false);

  const renderContent = () => {
    switch (variant) {
      case 'e1':
        return <PriceFilter value={value} onValueChange={onValueChange} />;
      case 'e2':
        return <SizeFilter value={value} onValueChange={onValueChange} />;
      case 'e3': // 옵션 (서버 데이터 필요)
        return (
          <OptionFilter
            value={value}
            onValueChange={onValueChange}
            publicOptions={data?.studioCommonOptions}
            privateOptions={data?.studioIndividualOptions}
          />
        );
      case 'e4': // 건물 유형 (서버 데이터 필요)
        return (
          <BuildingTypeFilter
          // value={value}
          // onValueChange={onValueChange}
          // buildingTypes={data?.buildingTypes || []}
          />
        );
      default:
        return null;
    }
  };

  const TriggerButton = (
    <button
      type='button'
      data-state={isOpen ? 'open' : 'closed'}
      aria-haspopup='menu'
      aria-expanded={isOpen}
      onClick={() => setIsOpen((prev) => !prev)}
      className={cn(
        'group',
        'rounded-4 text-base-l-16-1 flex-center gap-x-micro-2 h-11 w-full cursor-pointer border border-gray-300 bg-white px-4 py-2.5',
        {
          'text-base-m-14-1 h-9 px-3 py-[9px]': isMobile,
        },
        'hover:bg-gray-50',
        'data-[state=open]:border-primary-400 data-[state=open]:text-primary-600',
      )}
    >
      <span>{VARIANT_MAP[variant]}</span>
      <DownArrowIcon className='rotate-0 transition-transform duration-200 group-data-[state=open]:rotate-180' />
    </button>
  );

  if (isMobile) {
    return (
      <>
        {TriggerButton}
        <ModalBottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footerBtns={
            <div className='grid grid-cols-2 gap-x-1'>
              <Button variant='outline' size='xl'>
                초기화
              </Button>
              <Button
                variant='primary'
                size='xl'
                onClick={() => setIsOpen(false)}
              >
                적용하기
              </Button>
            </div>
          }
        >
          {renderContent()}
        </ModalBottomSheet>
      </>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>{TriggerButton}</Popover.Trigger>
      <Popover.Content align='start'>
        <div className='rounded-4 shadow-level-0 w-[375px] border border-gray-300 bg-white p-5'>
          {renderContent()}
        </div>
      </Popover.Content>
    </Popover>
  );
}
