'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import { cn } from '@muroom/lib';

interface DraggableCarouselProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  options?: Parameters<typeof useEmblaCarousel>[0];
}

export default function DraggableCarousel({
  children,
  className,
  containerClassName,
  options = {
    dragFree: true,
    containScroll: 'trimSnaps',
    align: 'start',
  },
}: DraggableCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    WheelGesturesPlugin(),
  ]);

  const [canScroll, setCanScroll] = useState(false);
  const dragInfo = useRef({ x: 0, y: 0 });

  const updateScrollState = useCallback(() => {
    if (!emblaApi) return;

    const snapList = emblaApi.scrollSnapList();
    const isOverflow = snapList.length > 1;

    setCanScroll(isOverflow);

    const currentWatchDrag = (emblaApi.internalEngine().options as any)
      .watchDrag;

    if (currentWatchDrag !== isOverflow) {
      emblaApi.reInit({ ...options, watchDrag: isOverflow });
    }
  }, [emblaApi, options]);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollState();

    emblaApi.on('resize', updateScrollState);
    emblaApi.on('reInit', updateScrollState);

    return () => {
      emblaApi.off('resize', updateScrollState);
      emblaApi.off('reInit', updateScrollState);
    };
  }, [emblaApi, updateScrollState]);

  const handlePointerDownCapture = useCallback(
    (e: React.PointerEvent) => {
      if (!canScroll) return;
      dragInfo.current = { x: e.clientX, y: e.clientY };
    },
    [canScroll],
  );

  const handleClickCapture = useCallback(
    (e: React.MouseEvent) => {
      if (!canScroll) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      const diffX = Math.abs(currentX - dragInfo.current.x);
      const diffY = Math.abs(currentY - dragInfo.current.y);

      if (diffX > 10 || diffY > 10) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    [canScroll],
  );

  return (
    <div
      ref={emblaRef}
      className={cn(
        'overflow-hidden',
        canScroll ? 'cursor-grab active:cursor-grabbing' : 'cursor-default',
        className,
      )}
      onPointerDownCapture={handlePointerDownCapture}
      onClickCapture={handleClickCapture}
    >
      <div
        className={cn(
          'flex touch-pan-y items-center gap-x-2',
          containerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
