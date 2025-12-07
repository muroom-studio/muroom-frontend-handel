'use client';

import { useState } from 'react';

import { Button, ModalBottomSheet, Popover } from '@muroom/components';
import { DownArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useStudioFilterOptionsQuery } from '@/hooks/api/studios/useQueries';
import { useFilters } from '@/hooks/nuqs/home/useFilters';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { getFilterLabel } from '@/utils/filters/getFilterLabel';

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

interface Props {
  variant: Variant;
  filters: ReturnType<typeof useFilters>['filters'];
  setFilters: ReturnType<typeof useFilters>['setFilters'];
}

export default function FilterItem({ variant, filters, setFilters }: Props) {
  const { data } = useStudioFilterOptionsQuery();

  const { isMobile } = useResponsiveLayout();
  const [isOpen, setIsOpen] = useState(false);

  const renderContent = () => {
    switch (variant) {
      case 'e1':
        return (
          <PriceFilter
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onChange={(min, max) =>
              setFilters({ minPrice: min, maxPrice: max })
            }
            onReset={() => setFilters({ minPrice: null, maxPrice: null })}
          />
        );
      case 'e2':
        return (
          <SizeFilter
            minRoomWidth={filters.minRoomWidth}
            maxRoomWidth={filters.maxRoomWidth}
            minRoomHeight={filters.minRoomHeight}
            maxRoomHeight={filters.maxRoomHeight}
            onChange={(vals) => setFilters(vals)}
          />
        );
      case 'e3':
        return (
          <OptionFilter
            commonOptionCodes={filters.commonOptionCodes}
            individualOptionCodes={filters.individualOptionCodes}
            onChange={(vals) => setFilters(vals)}
            publicOptions={data?.studioCommonOptions}
            privateOptions={data?.studioIndividualOptions}
          />
        );
      case 'e4':
        return (
          <BuildingTypeFilter
            floorTypes={filters.floorTypes}
            restroomTypes={filters.restroomTypes}
            isParkingAvailable={filters.isParkingAvailable}
            isLodgingAvailable={filters.isLodgingAvailable}
            hasFireInsurance={filters.hasFireInsurance}
            onChange={(vals) => setFilters(vals)}
            floorOptionsData={data?.floorOptions}
            restroomOptionsData={data?.restroomOptions}
          />
        );
      case 'e5':
        return (
          <InstrumentFilter
            forbiddenInstrumentCodes={filters.forbiddenInstrumentCodes}
            onChange={(vals) => setFilters(vals)}
            instrumentOptions={data?.forbiddenInstrumentOptions}
          />
        );
      default:
        return null;
    }
  };

  const buttonLabel = getFilterLabel({ variant, filters, data });

  const isActive = buttonLabel !== VARIANT_MAP[variant];

  const TriggerButton = (
    <button
      type='button'
      data-state={isOpen ? 'open' : 'closed'}
      aria-haspopup='menu'
      aria-expanded={isOpen}
      onClick={() => setIsOpen((prev) => !prev)}
      className={cn(
        'flex-center gap-x-micro-2 rounded-4 text-base-l-16-1 group h-11 w-full max-w-[202px] cursor-pointer border border-gray-300 bg-white px-4 py-2.5 transition-all',
        {
          'text-base-m-14-1 h-9 max-w-40 px-3 py-[9px]': isMobile,
        },
        'hover:bg-gray-50',
        'data-[state=open]:border-primary-400 data-[state=open]:text-primary-600',
        isActive && {
          'border-primary-400 !text-primary-600 text-base-l-16-2 bg-primary-50': true,
          'hover:bg-primary-100 hover:border-primary-400': true,
          'data-[state=open]:bg-primary-100 data-[state=open]:border-primary-400': true,
        },
      )}
    >
      <span className='truncate'>{buttonLabel}</span>
      <DownArrowIcon className='rotate-0 transition-transform duration-200 group-data-[state=open]:rotate-180' />
    </button>
  );

  if (isMobile) {
    const handleMobileReset = () => {
      switch (variant) {
        case 'e1':
          setFilters({
            minPrice: null,
            maxPrice: null,
          });
          break;

        case 'e2':
          setFilters({
            minRoomWidth: null,
            maxRoomWidth: null,
            minRoomHeight: null,
            maxRoomHeight: null,
          });
          break;
      }
    };
    return (
      <>
        {TriggerButton}
        <ModalBottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footerBtns={
            <div className='grid grid-cols-2 gap-x-1'>
              <Button variant='outline' size='xl' onClick={handleMobileReset}>
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
