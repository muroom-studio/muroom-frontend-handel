'use client';

import { MouseEvent, useCallback, useRef, useState } from 'react';

import Link from 'next/link';

import { Spinner } from '@muroom/components';
import { RightArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import CommonImage from '@/components/common/common-image';
import { useStudioBoastsSimpleQuery } from '@/hooks/api/studio-boasts/useQueries';
import { StudioBoastsSimpleItemDto } from '@/types/studio-boasts';
import { extractInfiniteData } from '@/utils/query';

interface Props {
  isMobile?: boolean;
  sort?: 'likes,desc' | 'latest,desc';
  title: string;
  headerRightSlot?: React.ReactNode;
}

const arrowButtonClass =
  'flex-center size-8 p-1 rounded-4 border border-gray-300 text-gray-700 transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer';

export default function BoastSimpleCarousel({
  isMobile = false,
  sort = 'likes,desc',
  title,
  headerRightSlot,
}: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStudioBoastsSimpleQuery({ sort });

  const { content: items } = extractInfiniteData<StudioBoastsSimpleItemDto>(
    data,
    true,
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const dragInfo = useRef({ x: 0, y: 0 });

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setIsAtStart(scrollLeft <= 0);
    const isEnd = scrollLeft + clientWidth >= scrollWidth - 2;
    setIsAtEnd(isEnd);

    if (
      scrollLeft + clientWidth >= scrollWidth - 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const handlePointerDownCapture = useCallback((e: React.PointerEvent) => {
    dragInfo.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    const currentX = e.clientX;
    const currentY = e.clientY;

    const diffX = Math.abs(currentX - dragInfo.current.x);
    const diffY = Math.abs(currentY - dragInfo.current.y);

    if (diffX > 10 || diffY > 10) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const firstItem = scrollRef.current.children[0] as HTMLElement;
    const itemWidth = firstItem?.offsetWidth || 0;
    const gap = 16;
    const scrollAmount = itemWidth + gap;

    if (itemWidth === 0) return;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'instant',
    });
  };

  const handleMobileClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  };

  if (!items || items.length === 0) return null;

  const itemClassName = cn(
    'rounded-4 relative shrink-0 overflow-hidden bg-gray-100 transition-transform duration-300 hover:scale-105 cursor-pointer',
    isMobile
      ? 'h-[140px] w-[140px]'
      : 'aspect-square h-auto w-[calc((100%-48px)/4)]',
  );

  return (
    <div
      className={cn(
        'flex flex-col py-8',
        {
          'gap-y-6': !isMobile,
        },
        {
          'gap-y-3': isMobile,
        },
      )}
    >
      <div
        className={cn('flex-between', {
          'px-5': isMobile,
        })}
      >
        <h2 className='text-base-l-16-2'>{title}</h2>
        {headerRightSlot && headerRightSlot}
      </div>

      {/* 캐러셀 본문 */}
      <div className='group relative'>
        {!isMobile && (
          <button
            onClick={() => scrollTo('left')}
            disabled={isAtStart}
            className={cn(
              arrowButtonClass,
              'absolute left-[calc(-32px-24px)] top-1/2 z-10 -translate-y-1/2',
            )}
          >
            <RightArrowIcon className='size-5 rotate-180' />
          </button>
        )}

        {/* [Main] Scroll Container */}
        <div
          ref={scrollRef}
          onPointerDownCapture={handlePointerDownCapture}
          onClickCapture={handleClickCapture}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onScroll={handleScroll}
          className={cn(
            'scrollbar-hide flex w-full overflow-x-auto pb-4',
            !isDragging && 'scroll-auto',
            isDragging ? 'cursor-grabbing' : 'cursor-grab',
            isMobile ? 'gap-x-3 px-4' : 'gap-x-4 px-0',
          )}
        >
          {items.map((item) => {
            if (isMobile) {
              return (
                <div
                  key={item.id}
                  onClick={() => handleMobileClick(item.id)}
                  onDragStart={(e) => e.preventDefault()}
                  className={itemClassName}
                >
                  <CommonImage
                    src={item.thumbnailImageFileUrl}
                    alt='작업실 이미지'
                    fill
                    sizes='140px'
                    className='object-cover'
                  />
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={`/studio-boasts/${item.id}`}
                onDragStart={(e) => e.preventDefault()}
                className={itemClassName}
              >
                <CommonImage
                  src={item.thumbnailImageFileUrl}
                  alt='작업실 이미지'
                  fill
                  sizes='25vw'
                  className='object-cover'
                />
              </Link>
            );
          })}

          {/* 로딩 스피너 */}
          {isFetchingNextPage && (
            <div
              className={cn(
                'flex shrink-0 items-center justify-center',
                isMobile
                  ? 'h-[140px] w-[140px]'
                  : 'aspect-square h-auto w-[calc((100%-48px)/4)]',
              )}
            >
              <Spinner variant='component' />
            </div>
          )}
        </div>

        {/* Next Button */}
        {!isMobile && (
          <button
            onClick={() => scrollTo('right')}
            disabled={isAtEnd && !hasNextPage}
            className={cn(
              arrowButtonClass,
              'absolute right-[calc(-32px-24px)] top-1/2 z-10 -translate-y-1/2',
            )}
          >
            <RightArrowIcon className='size-5' />
          </button>
        )}
      </div>
    </div>
  );
}
