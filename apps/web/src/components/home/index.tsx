'use client';

import { useEffect, useRef, useState } from 'react';

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
  // [State] 페이지네이션 (Desktop용)
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);

  // [NUQS] URL 상태 관리 훅
  const [keyword] = useSearch();

  const initCenter = { lat: 37.553993, lng: 126.9243517 };
  const [mapValue, setMapValue] = useMapState({
    center: initCenter,
    zoom: 16,
  });

  const { filters, setFilters, clearFilters } = useFilters();
  const { sort, setSort } = useSort();

  // [Effect] 필터/검색어/정렬 변경 시 페이지 초기화 및 스크롤 상단 이동
  useEffect(() => {
    setPage(1);
    listRef.current?.scrollTo({ top: 0 });
  }, [filters, keyword, sort]);

  // [Params] API 요청용 파라미터 생성
  const searchParams = mapValue.bounds
    ? {
        keyword: keyword ?? undefined,
        sort: sort ?? undefined,
        minPrice:
          filters.minPrice != null ? filters.minPrice * 10000 : undefined,
        maxPrice:
          filters.maxPrice != null ? filters.maxPrice * 10000 : undefined,
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

  // 1. 지도 마커 데이터 조회
  const { data: markersData, isLoading: isMarkersLoading } =
    useStudiosMapSearchQuery(searchParams);

  // 2. 리스트 데이터 조회 (Infinite Query로 통합)
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

    // 데이터
    studios, // 타입: StudiosMapListItem[]
    markersData: markersData ?? [],
    detailStudio,
    totalElements,

    // Refs & Loading
    listRef,
    isLoading: isMarkersLoading, // 전체 로딩(지도 기준)
    isListLoading, // 리스트 로딩
    isDetailLoading, // 상세 로딩

    // [Desktop] 페이지네이션 설정
    pagination: {
      currentPage: page,
      totalPages: pagination?.totalPages || 0,
      onPageChange: (newPage: number) => {
        setPage(newPage);
        listRef.current?.scrollTo({ top: 0 });
      },
    },

    // [Mobile] 무한 스크롤 설정
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
