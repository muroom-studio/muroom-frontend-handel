export type FilterOptionItem = {
  code: string;
  description: string;
};

export interface StudioFilterOptionsResponseProps {
  floorOptions: FilterOptionItem[];
  restroomOptions: FilterOptionItem[];
  studioCommonOptions: FilterOptionItem[];
  studioIndividualOptions: FilterOptionItem[];
  unavailableInstrumentOptions: FilterOptionItem[];
}

export type MarkerSize = 'S' | 'M' | 'L';

export interface StudiosMapSearchRequestProps {
  minLatitude: number;
  maxLatitude: number;
  minLongitude: number;
  maxLongitude: number;
  commonOptionCodes?: string[];
  individualOptionCodes?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRoomWidth?: number;
  maxRoomWidth?: number;
  minRoomHeight?: number;
  maxRoomHeight?: number;
  floorTypes?: string[];
  restroomTypes?: string[];
  isParkingAvailable?: boolean;
  isLodgingAvailable?: boolean;
  hasFireInsurance?: boolean;
  forbiddenInstrumentCodes?: string[];
}

export interface StudiosMapSearchItem {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  minPrice: number;
  maxPrice: number;
  isAd?: boolean; // 이건 나중에 칼럼명 바뀔 수 있음
}

export type StudiosMapSearchResponseProps = StudiosMapSearchItem[];
