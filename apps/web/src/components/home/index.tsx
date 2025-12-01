'use client';

import DesktopHomePage from '@/components/home/desktop';
import MobileHomePage from '@/components/home/mobile';
import { useStudiosQueries } from '@/hooks/api/studios/useQueries';
import { useFilters } from '@/hooks/nuqs/home/useFilters';
import { useMapState } from '@/hooks/nuqs/home/useMapState';
import { DUMMY_STUDIO } from '@/types/studio';
import { StudiosMapSearchRequestProps } from '@/types/studios';

interface Props {
  isMobile: boolean;
}

export default function HomePage({ isMobile }: Props) {
  const initCenter = { lat: 37.553993, lng: 126.9243517 };
  const [mapValue, setMapValue] = useMapState({
    center: initCenter,
    zoom: 16,
  });

  const { filters, setFilters, clearFilters } = useFilters();

  const searchParams: StudiosMapSearchRequestProps | undefined = mapValue.bounds
    ? {
        minPrice: filters.minPrice ?? undefined,
        maxPrice: filters.maxPrice ?? undefined,
        minRoomWidth: filters.minRoomWidth ?? undefined,
        maxRoomWidth: filters.maxRoomWidth ?? undefined,
        minRoomHeight: filters.minRoomHeight ?? undefined,
        maxRoomHeight: filters.maxRoomHeight ?? undefined,

        commonOptionCodes: filters.commonOptionCodes ?? undefined,
        individualOptionCodes: filters.individualOptionCodes ?? undefined,

        floorTypes: filters.floorTypes ?? undefined,
        restroomTypes: filters.restroomTypes ?? undefined,

        isParkingAvailable: filters.isParkingAvailable ?? undefined,
        isLodgingAvailable: filters.isLodgingAvailable ?? undefined,
        hasFireInsurance: filters.hasFireInsurance ?? undefined,

        forbiddenInstrumentCodes: filters.forbiddenInstrumentCodes ?? undefined,
        minLatitude: mapValue.bounds.minLat,
        maxLatitude: mapValue.bounds.maxLat,
        minLongitude: mapValue.bounds.minLng,
        maxLongitude: mapValue.bounds.maxLng,
      }
    : undefined;

  const { data: markersData, isLoading: markersDataLoading } =
    useStudiosQueries().useStudiosMapSearchQuery(searchParams);

  const DUMMY_DATA = DUMMY_STUDIO;
  const DETAIL_DUMMY_DATA = DUMMY_DATA.find((d) => d.id === mapValue.studioId);

  const commonProps = {
    mapValue,
    setMapValue,
    filters,
    setFilters,
    clearFilters,
    studios: DUMMY_DATA,
    detailStudio: DETAIL_DUMMY_DATA!,
    markersData: markersData ?? [],
    isLoading: markersDataLoading,
  };

  return (
    <main className='h-full'>
      {isMobile ? (
        <MobileHomePage {...commonProps} />
      ) : (
        <DesktopHomePage {...commonProps} />
      )}
    </main>
  );
}
