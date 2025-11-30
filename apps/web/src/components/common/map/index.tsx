'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { MotionValue, motion, useTransform } from 'framer-motion';

import {
  Button,
  ModalBottomSheet,
  TextField,
  ToggleButton,
} from '@muroom/components';
import { FilterIcon, SearchIcon } from '@muroom/icons';

import FilterItem, { Variant } from '@/components/home/components/filter-item';
import {
  BuildingTypeFilter,
  OptionFilter,
} from '@/components/home/components/filter-item/variants';
import { useMapOverlays } from '@/hooks/map/useMapOverlay';
import { useNaverMap } from '@/hooks/map/useNaverMap';
import { useFilters } from '@/hooks/nuqs/home/useFilters';
import { MAX_ZOOM, MIN_ZOOM, MapState } from '@/hooks/nuqs/home/useMapState';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { MarkerData } from '@/types/map/markers';

import CompareBtn from './ui/compare-btn';
import CurrentLocationBtn from './ui/current-location-btn';
import LocationTag from './ui/location-tag';
import ZoomControls from './ui/zoom-control-btn';

interface Props {
  mapValue: MapState;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
  markers?: MarkerData[];
  sheetY?: MotionValue<number>;
  middleRatio?: number;
}

export default function CommonMap({
  mapValue,
  setMapValue,
  markers,
  sheetY,
  middleRatio = 0.4,
}: Props) {
  const { isMobile } = useResponsiveLayout();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);

      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const uiBottom = useTransform(sheetY || new MotionValue(0), (latestY) => {
    if (!windowHeight) return 12;

    const middleYLimit = windowHeight * (1 - middleRatio);

    const effectiveY = Math.max(latestY, middleYLimit);

    return windowHeight - effectiveY + 12;
  });

  const handleMarkerClick = useCallback(
    (id: string, lat: number, lng: number) => {
      setMapValue((prev) => ({
        ...prev,
        center: { lat, lng },
        studioId: prev.studioId === id ? null : id,
      }));
    },
    [setMapValue],
  );

  const { mapInstance } = useNaverMap({
    mapRef,
    center: mapValue.center,
    zoom: mapValue.zoom,
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    setZoom: (newZoomUpdater) => {
      setMapValue((prev) => {
        const nextZoom =
          typeof newZoomUpdater === 'function'
            ? newZoomUpdater(prev.zoom)
            : newZoomUpdater;
        return {
          ...prev,
          zoom: Math.min(Math.max(nextZoom, MIN_ZOOM), MAX_ZOOM),
        };
      });
    },
    onCenterChange: (newCenter) => {
      setMapValue((prev) => ({
        ...prev,
        center: newCenter,
      }));
    },
  });

  // ✅ [추가됨] 지도가 멈출 때(idle) minLat, maxLat 등을 계산하여 Bounds 업데이트
  useEffect(() => {
    if (!mapInstance) return;

    const handleIdle = () => {
      const bounds = mapInstance.getBounds() as any;
      const sw = bounds.getSW(); // 남서쪽 (South-West)
      const ne = bounds.getNE(); // 북동쪽 (North-East)

      const newBounds = {
        minLat: sw.lat(),
        minLng: sw.lng(),
        maxLat: ne.lat(),
        maxLng: ne.lng(),
      };

      setMapValue((prev) => {
        const prevBounds = prev.bounds;

        // 기존 값과 완전히 같으면 업데이트 생략 (불필요한 렌더링 방지)
        if (
          prevBounds?.minLat === newBounds.minLat &&
          prevBounds?.minLng === newBounds.minLng &&
          prevBounds?.maxLat === newBounds.maxLat &&
          prevBounds?.maxLng === newBounds.maxLng
        ) {
          return prev;
        }

        return {
          ...prev,
          bounds: newBounds,
        };
      });
    };

    // 1. 컴포넌트 마운트(지도 로드) 시 초기값 설정을 위해 1회 실행
    handleIdle();

    // 2. 지도 유휴 상태(드래그/줌 종료) 리스너 등록
    const listener = naver.maps.Event.addListener(
      mapInstance,
      'idle',
      handleIdle,
    );

    return () => {
      naver.maps.Event.removeListener(listener);
    };
  }, [mapInstance, setMapValue]);

  useMapOverlays({
    mapInstance,
    markers,
    onMarkerClick: handleMarkerClick,
    selectedId: mapValue.studioId,
  });

  const handleZoomIn = useCallback(() => {
    setMapValue((prev) => ({
      ...prev,
      zoom: Math.min(MAX_ZOOM, prev.zoom + 1),
    }));
  }, [setMapValue]);

  const handleZoomOut = useCallback(() => {
    setMapValue((prev) => ({
      ...prev,
      zoom: Math.max(MIN_ZOOM, prev.zoom - 1),
    }));
  }, [setMapValue]);

  const renderMapUI = () => {
    if (isMobile) {
      return (
        <>
          <div className='absolute top-2 flex w-full flex-col gap-y-3 px-4'>
            <TextField
              id='keyword'
              name='keyword'
              placeholder='지하철역 또는 작업실 검색하기'
              leftIcon={<SearchIcon className='size-6' />}
              className='bg-white'
            />
            <FilterBtns />
          </div>
          <motion.div
            className='absolute right-4 z-50 flex flex-col gap-y-3'
            style={{ bottom: uiBottom }}
          >
            <CompareBtn isMobile={isMobile} />
            <CurrentLocationBtn
              isMobile={isMobile}
              mapValue={mapValue}
              setMapValue={setMapValue}
            />
          </motion.div>

          <motion.div
            className='absolute left-1/2 z-50 -translate-x-1/2'
            style={{ bottom: uiBottom }}
          >
            <LocationTag mapCenter={mapValue.center} size='S' />
          </motion.div>
        </>
      );
    }

    return (
      <>
        <div className='absolute right-4 top-4 z-50 flex flex-col gap-y-4'>
          <CurrentLocationBtn mapValue={mapValue} setMapValue={setMapValue} />
          <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        </div>

        <LocationTag
          mapCenter={mapValue.center}
          className='absolute bottom-10 left-1/2 z-50 -translate-x-1/2'
        />

        <CompareBtn className='absolute bottom-12 right-10 z-50' />
      </>
    );
  };

  return (
    <div className='relative h-full w-full'>
      <div ref={mapRef} className='h-full w-full' />
      {renderMapUI()}
    </div>
  );
}

const FilterBtns = () => {
  const { filteredValue, setFilter } = useFilters();

  const [isExtraOpen, setIsExtraOpen] = useState(false);

  const visibleKeys = ['e1', 'e2'] as const;

  return (
    <div className='flex items-center gap-x-3'>
      <ToggleButton
        variant='outline_icon'
        selected={isExtraOpen}
        onClick={() => setIsExtraOpen(true)}
      >
        <FilterIcon className='size-5' />
      </ToggleButton>
      <ModalBottomSheet
        isOpen={isExtraOpen}
        onClose={() => setIsExtraOpen(false)}
        footerBtns={
          <div className='grid grid-cols-2 gap-x-1'>
            <Button variant='outline' size='xl'>
              초기화
            </Button>
            <Button
              variant='primary'
              size='xl'
              onClick={() => setIsExtraOpen(false)}
            >
              적용하기
            </Button>
          </div>
        }
      >
        <div className='flex flex-col gap-y-2'>
          <OptionFilter />
          <BuildingTypeFilter />
        </div>
      </ModalBottomSheet>

      {visibleKeys.map((key) => (
        <div aria-label='필터 박스' key={key}>
          <FilterItem
            variant={key as Variant}
            value={filteredValue[key as keyof typeof filteredValue] ?? ''}
            onValueChange={(newValue) => setFilter(key as Variant, newValue)}
          />
        </div>
      ))}
    </div>
  );
};
