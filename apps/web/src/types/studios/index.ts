// 필터 옵션들 아이템 가져오기
import { PageRequestProps, PaginationInfo } from '../api';

export type FilterOptionItem = {
  id?: number;
  code: string;
  description: string;
  iconImageKey?: string;
};

export interface StudioFilterOptionsResponseProps {
  floorOptions: FilterOptionItem[];
  restroomOptions: FilterOptionItem[];
  studioCommonOptions: FilterOptionItem[];
  studioIndividualOptions: FilterOptionItem[];
  forbiddenInstrumentOptions: FilterOptionItem[];
}

// =======================================================
// =======================================================
// 지도 위 마커 띄우기

export type MarkerSize = 'S' | 'M' | 'L';

export interface StudiosMapSearchRequestProps {
  minLatitude: number;
  maxLatitude: number;
  minLongitude: number;
  maxLongitude: number;
  keyword?: string;
  sort?: string;
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

// =======================================================
// =======================================================
// 작업실 목록 불러오기

export interface StudiosMapListRequestProps
  extends StudiosMapSearchRequestProps, PageRequestProps {}

export interface StudiosMapListItem {
  latitude: number;
  longitude: number;
  studioId: number;
  studioName: string;
  minPrice: number;
  maxPrice: number;
  nearbySubwayStationInfo: {
    stationName: string;
    lines: {
      lineName: string;
      lineColor: string;
    }[];
    distanceInMeters: number;
  };
  thumbnailImageUrl?: string;
}

// 3. 응답 타입
export interface StudiosMapListResponseProps {
  content: StudiosMapListItem[];
  pagination: PaginationInfo;
}
