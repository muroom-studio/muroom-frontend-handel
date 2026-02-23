'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import DesktopHomePage from '@/components/home/desktop';
import MobileHomePage from '@/components/home/mobile';
import {
  useStudioDetailQuery,
  useStudiosMapListInfiniteQuery,
  useStudiosMapSearchQuery,
} from '@/hooks/api/studios/useQueries';
import { useSearch } from '@/hooks/nuqs/common/useSearch';
import { useFilters } from '@/hooks/nuqs/home/useFilters';
import { useMapState } from '@/hooks/nuqs/home/useMapState';
import { useSort } from '@/hooks/nuqs/home/useSort';
import { StudiosMapListItem } from '@/types/studios';
import { extractInfiniteData } from '@/utils/query';

interface Props {
  isMobile: boolean;
}

export default function HomePage({ isMobile }: Props) {
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const [keyword] = useSearch();
  const { filters, setFilters, clearFilters } = useFilters();
  const { sort, setSort } = useSort();

  const initCenter = { lat: 37.553993, lng: 126.9243517 };
  const [mapValue, setMapValue] = useMapState({
    center: initCenter,
    zoom: 16,
  });

  useEffect(() => {
    setPage(1);
    listRef.current?.scrollTo({ top: 0 });
  }, [filters, keyword, sort]);

  const searchParams = useMemo(() => {
    if (!mapValue.bounds) return undefined;
    return {
      keyword: keyword ?? undefined,
      sort: sort ?? undefined,
      minPrice: filters.minPrice != null ? filters.minPrice * 10000 : undefined,
      maxPrice: filters.maxPrice != null ? filters.maxPrice * 10000 : undefined,
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
    };
  }, [mapValue.bounds, keyword, sort, filters]);

  const { data: markersData, isLoading: isMarkersLoading } =
    useStudiosMapSearchQuery(searchParams);

  const {
    data: listData,
    isLoading: isListLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useStudiosMapListInfiniteQuery(searchParams, {
    page: page,
    size: 10,
    isMobile: isMobile,
  });

  const { content: studios, pagination } =
    extractInfiniteData<StudiosMapListItem>(listData, isMobile);
  const totalElements = pagination?.totalElements || 0;
  const { data: detailStudio, isLoading: isDetailLoading } =
    useStudioDetailQuery(mapValue.studioId);

  const commonProps = {
    mapValue,
    setMapValue,
    filters,
    setFilters,
    clearFilters,
    sort,
    setSort,
    studios,
    markersData: markersData ?? [],
    detailStudio,
    totalElements,
    listRef,
    isLoading: isMarkersLoading,
    isListLoading,
    isDetailLoading,
    pagination: {
      currentPage: page,
      totalPages: pagination?.totalPages || 0,
      onPageChange: (newPage: number) => {
        setPage(newPage);
        listRef.current?.scrollTo({ top: 0 });
      },
    },
    infiniteScroll: {
      hasNextPage: !!hasNextPage,
      isFetchingNextPage: isFetchingNextPage,
      fetchNextPage: fetchNextPage,
    },
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
