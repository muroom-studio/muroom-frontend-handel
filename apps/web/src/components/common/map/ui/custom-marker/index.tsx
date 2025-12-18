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
  onHoverChange?: (isHovered: boolean) => void;
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
  onHoverChange,
}: CustomMarkerProps) {
  // 디버깅용 로그: 이제 isHovered 상태도 함께 확인해보세요.
  // console.log(`[${name}] Selected: ${isSelected}, Hovered: ${isHovered}`);

  const HOVER_ACTION_TIME = 300;
  const [isHovered, setIsHovered] = useState(false);

  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  // 1. 내부 호버 상태가 변경될 때마다 부모에게 알림
  useEffect(() => {
    onHoverChange?.(isHovered);
  }, [isHovered, onHoverChange]);

  // [핵심 수정] 2. 선택이 해제되면(isSelected -> false), 호버 상태도 강제로 끕니다.
  // 다른 마커를 클릭해서 이 마커의 선택이 풀릴 때, 마우스가 떠났음에도 isHovered가 true로 남는 현상을 방지합니다.
  useEffect(() => {
    if (!isSelected) {
      setIsHovered(false);
      // 타이머가 돌고 있었다면 취소
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
        hoverTimer.current = null;
      }
    }
  }, [isSelected]);

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

  // 컴포넌트 언마운트 시 타이머 정리
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

  // 3. 렌더링 로직 (기존 유지)
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
          'rounded-4 shadow-level-2 flex-center-col z-[9999] gap-y-2 bg-white p-3',
          'hover:bg-primary-400 hover:text-white',
          !isSelected && 'hover:scale-105',
          'text-primary-600 w-[154px]',
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
          'flex-center rounded-4 shadow-level-2 z-10 cursor-pointer p-3',
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
        'flex-center rounded-4 shadow-level-2 z-10 size-6 cursor-pointer border-2 border-white hover:scale-110',
        themeColor,
      )}
    />
  );
}
