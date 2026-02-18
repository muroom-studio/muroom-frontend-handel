'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { MotionValue, motion, useTransform } from 'framer-motion';

import { Button, ModalBottomSheet, ToggleButton } from '@muroom/components';
import { FilterIcon } from '@muroom/icons';

import FilterItem, { Variant } from '@/components/home/components/filter-item';
import {
  BuildingTypeFilter,
  InstrumentFilter,
  OptionFilter,
} from '@/components/home/components/filter-item/variants';
import { useStudioFilterOptionsQuery } from '@/hooks/api/studios/useQueries';
import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';
import { useMapOverlays } from '@/hooks/map/useMapOverlay';
import { useNaverMap } from '@/hooks/map/useNaverMap';
import { useSearch } from '@/hooks/nuqs/common/useSearch';
import { useFilters } from '@/hooks/nuqs/home/useFilters';
import { MAX_ZOOM, MIN_ZOOM, MapState } from '@/hooks/nuqs/home/useMapState';
import { useRecentSearchStore } from '@/store/useRecentKeywordStore';
import { StudiosMapSearchItem } from '@/types/studios';

import CurrentLocationBtn from './ui/current-location-btn';
import FaqButton from './ui/faq-btn';
import LocationTag from './ui/location-tag';
import ZoomControls from './ui/zoom-control-btn';

interface Props {
  mapValue: MapState;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
  markers: StudiosMapSearchItem[];
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
  const [keyword, setKeyword] = useSearch();
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

  const uiY = useTransform(sheetY || new MotionValue(0), (latestY) => {
    if (!windowHeight) return latestY;
    const middleY = windowHeight * (1 - middleRatio);
    return Math.max(latestY, middleY);
  });

  const handleMarkerClick = useCallback(
    (id: string) => {
      setMapValue((prev) => ({
        ...prev,
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
    setZoom: () => {},
    onCenterChange: () => {},
  });

  useEffect(() => {
    if (!mapInstance) return;

    const handleIdle = () => {
      requestAnimationFrame(() => {
        const center = mapInstance.getCenter();
        const zoom = mapInstance.getZoom();
        const bounds = mapInstance.getBounds();
        const sw = bounds.getSW();
        const ne = bounds.getNE();

        const newCenter = { lat: center.lat(), lng: center.lng() };
        const newBounds = {
          minLat: sw.lat(),
          minLng: sw.lng(),
          maxLat: ne.lat(),
          maxLng: ne.lng(),
        };

        setMapValue((prev) => {
          const isSame =
            prev.zoom === zoom &&
            Math.abs(prev.center.lat - newCenter.lat) < 0.000001 &&
            Math.abs(prev.bounds?.minLat ?? 0 - newBounds.minLat) < 0.000001;

          if (isSame) return prev;
          return { ...prev, center: newCenter, zoom, bounds: newBounds };
        });
      });
    };

    const listener = naver.maps.Event.addListener(
      mapInstance,
      'idle',
      handleIdle,
    );
    return () => naver.maps.Event.removeListener(listener);
  }, [mapInstance, setMapValue]);

  useMapOverlays({
    mapInstance,
    markers,
    onMarkerClick: handleMarkerClick,
    selectedId: mapValue.studioId,
  });

  const handleZoomIn = useCallback(
    () => mapInstance?.setZoom(mapInstance.getZoom() + 1),
    [mapInstance],
  );
  const handleZoomOut = useCallback(
    () => mapInstance?.setZoom(mapInstance.getZoom() - 1),
    [mapInstance],
  );

  const { pendingKeyword, setPendingKeyword } = useRecentSearchStore();
  useEffect(() => {
    if (pendingKeyword !== null) {
      setKeyword(pendingKeyword);
      setPendingKeyword(null);
    }
  }, [pendingKeyword, setKeyword, setPendingKeyword]);

  const renderMapUI = () => {
    if (isMobile) {
      return (
        <div className='absolute top-2 flex w-full flex-col gap-y-3 px-4'>
          <FilterBtns />
          {sheetY && (
            <motion.div
              className='pointer-events-none absolute left-0 top-0 z-50 w-full px-4'
              style={{ y: uiY }}
            >
              <div className='relative flex w-full -translate-y-full flex-col pb-4'>
                <div className='relative flex w-full items-end justify-end'>
                  <div className='pointer-events-auto absolute bottom-0 left-1/2 -translate-x-1/2'>
                    <LocationTag
                      mapCenter={mapValue.center}
                      size='S'
                      className='h-9'
                    />
                  </div>
                  <div className='pointer-events-auto flex flex-col gap-y-3'>
                    <CurrentLocationBtn
                      isMobile={isMobile}
                      mapValue={mapValue}
                      setMapValue={setMapValue}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
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
        <FaqButton className='absolute bottom-12 right-10 z-50' />
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
  const { data } = useStudioFilterOptionsQuery();
  const { filters, setFilters } = useFilters();
  const [isExtraOpen, setIsExtraOpen] = useState(false);
  const visibleKeys = ['e1', 'e2'] as const;
  const hasActiveFilter = Object.values(filters).some((val) =>
    Array.isArray(val) ? val.length > 0 : val !== null,
  );

  return (
    <div className='flex items-center gap-x-3'>
      <ToggleButton
        variant='outline_icon'
        selected={isExtraOpen || hasActiveFilter}
        onClick={() => setIsExtraOpen(true)}
      >
        <FilterIcon className='size-5' />
      </ToggleButton>
      <ModalBottomSheet
        isOpen={isExtraOpen}
        onClose={() => setIsExtraOpen(false)}
        footerBtns={
          <div className='grid grid-cols-2 gap-x-1'>
            <Button
              variant='outline'
              size='xl'
              onClick={() => setFilters(null)}
            >
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
        <div className='gap-y-15 flex flex-col'>
          <OptionFilter
            commonOptionCodes={filters.commonOptionCodes}
            individualOptionCodes={filters.individualOptionCodes}
            onChange={(vals) => setFilters(vals)}
            publicOptions={data?.studioCommonOptions}
            privateOptions={data?.studioIndividualOptions}
          />
          <BuildingTypeFilter
            floorTypes={filters.floorTypes}
            restroomTypes={filters.restroomTypes}
            isParkingAvailable={filters.isParkingAvailable}
            isLodgingAvailable={filters.isLodgingAvailable}
            hasFireInsurance={filters.hasFireInsurance}
            onChange={(vals) => setFilters(vals)}
            floorOptionsData={data?.floorOptions}
            restroomOptionsData={data?.restroomOptions}
          />
          <InstrumentFilter
            forbiddenInstrumentCodes={filters.forbiddenInstrumentCodes}
            onChange={(vals) => setFilters(vals)}
            instrumentOptions={data?.forbiddenInstrumentOptions}
          />
        </div>
      </ModalBottomSheet>
      {visibleKeys.map((key) => (
        <div aria-label='필터 박스' key={key}>
          <FilterItem
            variant={key as Variant}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      ))}
    </div>
  );
};
