'use client';

import { useRouter } from 'next/navigation';

import { Badge } from '@muroom/components';
import { cn } from '@muroom/lib';

import CommonImage from '@/components/common/common-image';
import { NearestSubwayStationDto } from '@/types/studio';

interface Props {
  variant: 'known' | 'unknown';
  id: string; // Known 필수
  title: string; // Common
  subwayInfo?: NearestSubwayStationDto; // Known
  minPrice?: number; // Known
  maxPrice?: number; // Known
  thumbnailUrl?: string | null; // Known (Desktop only)
  address?: string; // Unknown
  isMobile?: boolean;
  wrapperClassName?: string;
}

export default function BoastStudioCard({
  isMobile = false,
  variant,
  id,
  title,
  minPrice,
  maxPrice,
  thumbnailUrl,
  subwayInfo,
  address,
  wrapperClassName,
}: Props) {
  const router = useRouter();

  const { stationName, distanceInMeters, lines } = subwayInfo || {};

  const showThumbnail = !isMobile && variant === 'known' && thumbnailUrl;

  const handleCardClick = () => {
    if (variant === 'known') {
      router.push(`/home?studioId=${id}`);
    }
    return;
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'rounded-4 w-full bg-gray-50 px-4 py-6 transition-colors',
        wrapperClassName,
        showThumbnail ? 'grid grid-cols-[140px_1fr] gap-x-3' : 'flex flex-col',
        variant === 'known' && 'h-47 cursor-pointer',
      )}
    >
      {/* --- [A] 썸네일 영역 (Desktop & Known Only) --- */}
      {showThumbnail && (
        <div className='rounded-4 size-35 relative shrink-0 overflow-hidden'>
          <CommonImage
            src={thumbnailUrl}
            alt={`${id}-${title}`}
            fill
            className='object-cover'
          />
        </div>
      )}

      {/* --- [B] 정보 영역 --- */}
      <div className={cn('flex h-full flex-col justify-between')}>
        <div className='flex flex-col gap-y-3'>
          {/* 1. 상단: 가격(Known) vs 타이틀(Unknown) */}
          {variant === 'known' ? (
            <span className='text-title-s-22-2'>
              {minPrice && maxPrice
                ? `${minPrice / 10000}~${maxPrice / 10000}만원`
                : '가격문의'}
            </span>
          ) : (
            <span className='text-title-s-22-2 text-gray-500'>{title}</span>
          )}

          {/* 2. 중단: 지하철 정보 (Known Only) */}
          {variant === 'known' && subwayInfo && (
            <div className='flex items-center gap-x-1'>
              {Array.isArray(lines) && lines.length > 0 && lines[0] && (
                <Badge
                  key={lines[0].lineName}
                  variant='subway'
                  lineName={lines[0].lineName}
                  lineColor={lines[0].lineColor}
                />
              )}
              <p className='text-base-m-14-1'>
                {`${stationName}역에서 ${distanceInMeters?.toLocaleString() ?? 0}m`}
              </p>
            </div>
          )}

          {variant === 'unknown' && (
            <p className='text-base-m-14-1 break-keep text-gray-500'>
              {address}
            </p>
          )}
        </div>

        {/* 3. 하단: 타이틀(Known) vs 주소(Unknown) */}
        {variant === 'known' && (
          <p className='text-base-m-14-1 break-keep text-gray-500'>{title}</p>
        )}
      </div>
    </div>
  );
}
