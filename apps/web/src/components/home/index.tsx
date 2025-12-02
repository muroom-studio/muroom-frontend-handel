'use client';

import { useState } from 'react';

import DesktopHomePage from '@/components/home/desktop';
import MobileHomePage from '@/components/home/mobile';
import { useStudiosQueries } from '@/hooks/api/studios/useQueries';
import { useFilters } from '@/hooks/nuqs/home/useFilters';
import { useMapState } from '@/hooks/nuqs/home/useMapState';

interface Props {
  isMobile: boolean;
}

export default function HomePage({ isMobile }: Props) {
  const [page, setPage] = useState(1);

  const initCenter = { lat: 37.553993, lng: 126.9243517 };
  const [mapValue, setMapValue] = useMapState({
    center: initCenter,
    zoom: 16,
  });

  const { filters, setFilters, clearFilters } = useFilters();

  const searchParams = mapValue.bounds
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

        // 지도 범위
        minLatitude: mapValue.bounds.minLat,
        maxLatitude: mapValue.bounds.maxLat,
        minLongitude: mapValue.bounds.minLng,
        maxLongitude: mapValue.bounds.maxLng,
      }
    : undefined;

  const {
    useStudiosMapSearchQuery,
    useStudiosMapListInfiniteQuery,
    useStudiosDetailQuery,
  } = useStudiosQueries();

  const { data: markersData, isLoading: isMarkersLoading } =
    useStudiosMapSearchQuery(searchParams);

  // ------------------------------------------------------------------
  // [리스트 조회 쿼리] (무한스크롤 & 페이지네이션 통합)
  // - size: 10개로 통일
  // - 로딩 상태: isListLoading으로 따로 관리 (필요 시 UI에 별도 표시)
  // ------------------------------------------------------------------
  const {
    data: listData,
    isLoading: isListLoading, // 리스트 데이터가 아예 없을 때의 초기 로딩
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage, // (모바일) 추가 데이터 불러오는 중
  } = useStudiosMapListInfiniteQuery(searchParams, {
    page: page,
    size: 10, // 요청하신 대로 10개 통일
    isMobile: isMobile,
  });
  // 5. 데이터 가공
  // 통합된 스튜디오 리스트 (모바일은 누적, PC는 교체됨)
  const studios = listData?.pages.flatMap((page) => page.content) || [];

  const { data: detailStudio } = useStudiosDetailQuery(mapValue.studioId);

  console.log(detailStudio);

  // 6. Props 구성
  const commonProps = {
    mapValue,
    setMapValue,
    filters,
    setFilters,
    clearFilters,

    studios,
    detailStudio,
    markersData: markersData ?? [],

    // [수정됨] 전체 로딩 상태는 '마커 데이터' 기준입니다.
    // 리스트 로딩 중이어도 지도는 보여야 하기 때문입니다.
    // PC 페이지네이션 이동 시에는 keepPreviousData 덕분에 이 값이 true가 되지 않아 깜빡임이 없습니다.
    isLoading: isMarkersLoading,
    isListLoading: isListLoading,

    // [PC] 페이지네이션 정보
    pagination: {
      currentPage: page,
      // 데이터가 없으면 0, 있으면 첫 페이지의 메타데이터 사용
      totalPages: listData?.pages[0]?.pagination.totalPages || 0,
      onPageChange: (newPage: number) => {
        setPage(newPage);
        // 필요하다면 리스트 상단으로 스크롤 이동 로직 추가
      },
    },

    // [Mobile] 무한스크롤 정보
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
