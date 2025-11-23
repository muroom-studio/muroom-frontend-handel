'use client';

import { useMotionValue } from 'framer-motion';

import CommonMap from '@/components/common/map';

import { BottomSheet } from '@muroom/components';

import ListFilter from '../components/list-filter';
import ListView from '../components/list-view';

import { MapState } from '@/hooks/nuqs/home/useMapState';

import { MarkerData } from '@/types/map/markers';

import { Studio } from '@/types/studio';

interface Props {
  mapValue: MapState;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
  studios: Studio[];
  detailStudio: Studio;
  markersData: MarkerData[];
}

const SHEET_CONFIG = {
  topMargin: 118,
  middleRatio: 0.4,
  minHeight: 80,
  footerHeight: 64,
};

export default function MobileHomePage({
  mapValue,
  setMapValue,
  studios,
  markersData,
}: Props) {
  const sheetY = useMotionValue(0);

  return (
    <div className='flex h-screen flex-1 flex-col'>
      <div className='h-full w-full'>
        <CommonMap
          mapValue={mapValue}
          setMapValue={setMapValue}
          markers={markersData}
          sheetY={sheetY}
          middleRatio={SHEET_CONFIG.middleRatio}
        />
      </div>

      <BottomSheet {...SHEET_CONFIG} header={<ListFilter />} externalY={sheetY}>
        <ListView
          studios={studios}
          mapValue={mapValue}
          setMapValue={setMapValue}
        />
      </BottomSheet>
    </div>
  );
}
