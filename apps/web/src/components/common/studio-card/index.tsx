import Image from 'next/image';

import { Badge } from '@muroom/components';
import { cn } from '@muroom/lib';

import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';
import { NearestSubwayStationDto } from '@/types/studio';

interface Props {
  id: string;
  title: string;
  minPrice?: number;
  maxPrice?: number;
  thumbnailUrl?: string | null;
  subwayInfo: NearestSubwayStationDto;
  isActive?: boolean;
  onClick?: () => void;
  wrapperClassName?: string;
}

export default function CommonStudioCard({
  id,
  title,
  minPrice,
  maxPrice,
  thumbnailUrl,
  subwayInfo,
  isActive,
  onClick,
  wrapperClassName,
}: Props) {
  const { isMobile } = useResponsiveLayout();

  const { stationName, distanceInMeters, lines } = subwayInfo;

  return (
    <div
      className={cn(
        'flex cursor-pointer gap-x-3 border-b border-b-gray-300 px-4 py-6 transition-colors hover:bg-gray-100',
        {
          'bg-primary-50 hover:bg-primary-50': isActive,
        },
        {
          'px-0': isMobile,
        },
        wrapperClassName,
      )}
      onClick={onClick}
    >
      {thumbnailUrl ? (
        <StudioImg thumbnailUrl={thumbnailUrl} alt={`${id} 스튜디오 이미지`} />
      ) : (
        <div className='size-[140px] shrink-0' />
      )}

      <div className='flex flex-col justify-between'>
        <div className='flex flex-col gap-y-3'>
          <div className='flex-between'>
            <span className='text-title-s-22-1'>
              {minPrice && maxPrice
                ? `${minPrice / 10000}~${maxPrice / 10000}만원`
                : '가격문의'}
            </span>
          </div>

          <div
            className={cn('flex', {
              'flex-col items-start gap-y-1': lines.length >= 2,
              'items-center gap-x-1': lines.length < 2,
            })}
          >
            <div className='flex items-center gap-x-1'>
              {Array.isArray(lines) &&
                lines.map((line) => (
                  <Badge
                    key={line.lineName}
                    variant='subway'
                    lineName={line.lineName}
                    lineColor={line.lineColor}
                  />
                ))}
            </div>

            <p className='text-base-m-14-1'>
              {`${stationName}역에서 ${distanceInMeters.toLocaleString()}m`}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-x-1'>
          <p className='text-base-m-14-1 max-w-[130px] truncate text-gray-500'>
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

const StudioImg = ({
  thumbnailUrl,
  alt,
}: {
  thumbnailUrl: string;
  alt: string;
}) => {
  return (
    <div className='relative h-[140px] w-[140px] shrink-0'>
      <Image
        src={thumbnailUrl}
        alt={alt}
        width={140}
        height={140}
        className='rounded-4 h-[140px] min-h-[140px] w-[140px] min-w-[140px] shrink-0 object-cover'
      />
    </div>
  );
};
