'use client';

import { useMotionValue, AnimatePresence, motion } from 'framer-motion'; // ✨ import 추가

import CommonMap from '@/components/common/map';
import CommonDetailStudio from '@/components/common/detail-studio'; // 상세 컴포넌트
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

// 상수 설정
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
  detailStudio,
  markersData,
}: Props) {
  const sheetY = useMotionValue(0);

  return (
    <div className='relative flex h-screen flex-1 flex-col overflow-hidden'>
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

      <AnimatePresence>
        {detailStudio && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='z-100 fixed inset-0 flex flex-col bg-white'
          >
            <CommonDetailStudio
              detailStudio={detailStudio}
              setStudioId={(id: string) =>
                setMapValue((prev) => ({
                  ...prev,
                  studioId: prev.studioId === id ? null : id,
                }))
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
