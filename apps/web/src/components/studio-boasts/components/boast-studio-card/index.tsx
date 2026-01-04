'use client';

import { useRouter } from 'next/navigation';

import { Badge } from '@muroom/components';
import { cn } from '@muroom/lib';

import CommonImage from '@/components/common/common-image';
import { NearestSubwayStationDto } from '@/types/studio';

interface Props {
  variant: 'known' | 'unknown';
  id: string;
  title: string;
  subwayInfo?: NearestSubwayStationDto;
  minPrice?: number;
  maxPrice?: number;
  thumbnailUrl?: string | null;
  address?: string;
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

      <div className={cn('flex h-full flex-col justify-between')}>
        <div className='flex flex-col gap-y-3'>
          {variant === 'known' ? (
            <span className='text-title-s-22-2'>
              {minPrice && maxPrice
                ? `${minPrice / 10000}~${maxPrice / 10000}만원`
                : '가격문의'}
            </span>
          ) : (
            <span className='text-title-s-22-2 text-gray-500'>{title}</span>
          )}

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
            <span className='text-base-m-14-1 break-keep text-gray-500'>
              {address}
            </span>
          )}
        </div>

        {variant === 'known' && (
          <span className='text-base-m-14-1 break-keep text-gray-500'>
            {title}
          </span>
        )}
      </div>
    </div>
  );
}
