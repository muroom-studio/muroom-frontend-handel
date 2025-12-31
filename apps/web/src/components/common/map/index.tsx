'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

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

import CompareBtn from './ui/compare-btn';
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

  useEffect(() => {
    if (!mapInstance) return;

    const handleIdle = () => {
      const bounds = mapInstance.getBounds() as any;
      const sw = bounds.getSW();
      const ne = bounds.getNE();

      const newBounds = {
        minLat: sw.lat(),
        minLng: sw.lng(),
        maxLat: ne.lat(),
        maxLng: ne.lng(),
      };

      setMapValue((prev) => {
        const prevBounds = prev.bounds;

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

    handleIdle();

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
        <>
          <div className='absolute top-2 flex w-full flex-col gap-y-3 px-4'>
            {/* <Link href='/search' scroll={false}>
              <TextField
                id='keyword'
                name='keyword'
                value={keyword || ''}
                onClear={() => setKeyword('')}
                placeholder='지하철역 또는 작업실 검색하기'
                leftIcon={<SearchIcon className='size-6' />}
                inputClassName={
                  'bg-white cursor-pointer focus:border-primary-400'
                }
              />
            </Link> */}
            <FilterBtns />
          </div>

          {/* Floating UI */}
          {sheetY && (
            <motion.div
              className='pointer-events-none absolute left-0 top-0 z-50 w-full px-4'
              style={{ y: uiY }}
            >
              <div
                className={
                  'relative flex w-full -translate-y-full flex-col pb-4'
                }
              >
                <div className='relative flex w-full items-end justify-end'>
                  <div className='pointer-events-auto absolute bottom-0 left-1/2 -translate-x-1/2'>
                    <LocationTag
                      mapCenter={mapValue.center}
                      size='S'
                      className='h-9'
                    />
                  </div>

                  <div className='pointer-events-auto flex flex-col gap-y-3'>
                    {/* <CompareBtn isMobile={isMobile} /> */}
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

  const hasActiveFilter =
    (filters.commonOptionCodes?.length ?? 0) > 0 ||
    (filters.individualOptionCodes?.length ?? 0) > 0 ||
    (filters.floorTypes?.length ?? 0) > 0 ||
    (filters.restroomTypes?.length ?? 0) > 0 ||
    filters.isParkingAvailable !== null ||
    filters.isLodgingAvailable !== null ||
    filters.hasFireInsurance !== null ||
    (filters.forbiddenInstrumentCodes?.length ?? 0) > 0;

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
              onClick={() =>
                setFilters({
                  commonOptionCodes: null,
                  individualOptionCodes: null,

                  floorTypes: null,
                  restroomTypes: null,
                  isParkingAvailable: null,
                  isLodgingAvailable: null,
                  hasFireInsurance: null,

                  forbiddenInstrumentCodes: null,
                })
              }
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
