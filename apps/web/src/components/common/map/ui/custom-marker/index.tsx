import React from 'react';
import { cn } from '@muroom/lib';
import { MarkerData, MarkerSize } from '@/types/map/markers';

export interface CustomMarkerProps
  extends Pick<MarkerData, 'priceMin' | 'priceMax' | 'name' | 'isAd'> {
  isMobile?: boolean;
  size: MarkerSize;
  isSelected: boolean;
  onClick: () => void;
}

export default function CustomMarker({
  isMobile = false,
  priceMin,
  priceMax,
  name,
  isAd,
  size,
  isSelected,
  onClick,
}: CustomMarkerProps) {
  const centerPositionClasses =
    'absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2';

  const priceText =
    priceMin && priceMax ? `${priceMin}~${priceMax}만원` : '가격문의';

  if (isSelected) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={cn(
          centerPositionClasses,
          'rounded-4 shadow-level-2 flex-center-col z-50 border-2 border-white bg-white p-3 transition-transform hover:scale-105',
          'text-primary-600 min-w-[140px]',
          {
            'min-w-[120px] px-3 py-2': isMobile,
          },
        )}
      >
        <div
          className={cn('text-base-l-16-2 max-w-[130px] truncate', {
            'text-base-m-14-2 max-w-[110px]': isMobile,
          })}
        >
          {name}
        </div>
        <div
          className={cn('text-title-s-22-2', {
            'text-base-l-16-2': isMobile,
          })}
        >
          {priceText}
        </div>
      </div>
    );
  }

  const showPriceTag = size === 'L' || (size === 'M' && isAd);
  const themeColor = 'bg-purple-600 text-white hover:bg-purple-400';

  if (showPriceTag) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={cn(
          centerPositionClasses,
          'flex-center rounded-4 shadow-level-2 cursor-pointer p-3 transition-all',
          'hover:scale-110',
          {
            'px-3 py-[7px]': isMobile,
          },
          themeColor,
        )}
      >
        <span
          className={cn('text-base-l-16-2 whitespace-nowrap', {
            'text-base-m-14-2': isMobile,
          })}
        >
          {priceText}
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        centerPositionClasses,
        'flex-center rounded-4 shadow-level-2 size-6 cursor-pointer border-2 border-white transition-all hover:scale-110',
        themeColor,
      )}
    />
  );
}
