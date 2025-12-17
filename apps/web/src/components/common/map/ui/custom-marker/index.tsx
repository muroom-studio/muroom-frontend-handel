import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@muroom/lib';

import { MarkerSize, StudiosMapSearchItem } from '@/types/studios';

export interface CustomMarkerProps extends Pick<
  StudiosMapSearchItem,
  'minPrice' | 'maxPrice' | 'name' | 'isAd'
> {
  isMobile?: boolean;
  size: MarkerSize;
  isSelected: boolean;
  onClick: () => void;
}

export default function CustomMarker({
  isMobile = false,
  minPrice,
  maxPrice,
  name,
  isAd,
  size,
  isSelected,
  onClick,
}: CustomMarkerProps) {
  const HOVER_ACTION_TIME = 300;
  const [isHovered, setIsHovered] = useState(false);

  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const centerPositionClasses =
    'absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2';

  const priceText =
    minPrice && maxPrice
      ? `${minPrice / 10000}~${maxPrice / 10000}만원`
      : '가격문의';

  const showPriceTag = size === 'L' || size === 'M';
  const themeColor = 'bg-primary-600 text-white';

  const handleMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);

    hoverTimer.current = setTimeout(() => {
      setIsHovered(true);
    }, HOVER_ACTION_TIME);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setIsHovered(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  const hoverHandlers =
    !isMobile && !isSelected
      ? {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        }
      : {};

  if (isSelected || isHovered) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        {...hoverHandlers}
        className={cn(
          centerPositionClasses,
          'rounded-4 shadow-level-2 flex-center-col z-100 gap-y-2 bg-white p-3 transition-all',
          'hover:bg-primary-400 hover:text-white',
          !isSelected && 'hover:scale-105',
          'text-primary-600 w-[154px]',
          {
            'min-w-[120px] px-3 py-2': isMobile,
            'z-50': isSelected,
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

  if (showPriceTag) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        {...hoverHandlers}
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
      {...hoverHandlers}
      className={cn(
        centerPositionClasses,
        'flex-center rounded-4 shadow-level-2 size-6 cursor-pointer border-2 border-white transition-all hover:scale-110',
        themeColor,
      )}
    />
  );
}
