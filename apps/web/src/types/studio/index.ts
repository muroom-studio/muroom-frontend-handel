// 작업실 상세 조회 타입 정의
export interface StudioDetailRequestProps {
  studioId: string;
}

export interface StudioBaseInfo {
  studioId: number;
  studioName: string;
  roadNameAddress: string;
  studioLongitude: number;
  studioLatitude: number;
  studioMinPrice: number;
  studioMaxPrice: number;
  depositAmount: number; // [이동됨] 건물 정보 -> 기본 정보로 이동
  nearbySubwayStations: {
    stationName: string;
    lines: {
      lineName: string;
      lineColor: string;
    }[];
    walkingTimeMinutes: number;
  }[];
}

export interface StudioBuildingInfo {
  // [변경] Object -> string (Java DTO에 별도 Class 정의가 없으므로 Enum Code 문자열로 추정)
  floorType: {
    description: string;
    code: 'ALL' | 'GROUND' | 'BASEMENT';
  };
  floorNumber: number;

  hasRestroom: boolean;
  restroomLocation: {
    description: string;
    code: string;
  };
  restroomGender: {
    description: string;
    code: string;
  };

  // [변경] Object -> string (Java DTO 기준 Enum Code)
  parkingFeeType: {
    description: string;
    code: 'FREE' | 'PAID' | 'NONE';
  };

  parkingFeeInfo?: string; // [Optional] 주차 정보가 없을 수 있음
  parkingSpots?: number; // [Optional]
  parkingLocationName?: string; // [Optional]
  parkingLocationAddress?: string; // [Optional]
  parkingLocationLongitude?: number;
  parkingLocationLatitude?: number;
  isLodgingAvailable: boolean;
  hasFireInsurance: boolean;

  // [삭제됨] depositAmount -> StudioBaseInfo로 이동
  // [삭제됨] studioBuildingImageUrls -> StudioImagesDto로 통합 이동
}

export interface StudioNotice {
  ownerNickname: string;
  ownerPhoneNumber: string; // [추가] Java DTO에 존재함
  experienceYears: number;
  isIdentityVerified: boolean;
  introduction: string;
}

// [추가] Java DTO 구조에 맞춰 별도 인터페이스로 분리
export interface StudioForbiddenInstruments {
  instruments: string[]; // 예: ["드럼", "금관"]
}

export interface StudioRoomItem {
  roomId: number;
  roomName: string;
  isAvailable: boolean | null;
  availableAt: string; // Date string "YYYY-MM-DD"
  widthMm: number;
  heightMm: number;
  roomBasePrice: number;
}

export interface StudioRoomsInfo {
  rooms: StudioRoomItem[];
}

export interface StudioOptionItem {
  code: string;
  description: string;
  iconImageKey: string; // [이름 변경] Url -> Key (Java DTO: iconImageKey)
}

export interface StudioOptionsInfo {
  commonOptions: StudioOptionItem[];
  individualOptions: StudioOptionItem[];
}

// [추가] Java DTO의 StudioImagesDto 대응 (모든 이미지 키가 여기에 모여있음)
export interface StudioImages {
  mainImageKeys: string[]; // [이동됨] BaseInfo에서 이동
  buildingImageKeys: string[]; // [이동됨] BuildingInfo에서 이동
  roomImageKeys: string[]; // [이동됨] RoomsInfo에서 이동
  blueprintImageKey?: string; // [추가] 도면 이미지 (Optional 가능성)
  commonOptionImageKeys: string[]; // [추가] 공용 옵션 이미지
  individualOptionImageKeys: string[]; // [추가] 개별 옵션 이미지
}

// 최종 응답 타입
export interface StudioDetailResponseProps {
  studioBaseInfo: StudioBaseInfo;
  studioBuildingInfo: StudioBuildingInfo;
  studioNotice: StudioNotice;
  studioForbiddenInstruments: StudioForbiddenInstruments;
  studioRooms: StudioRoomsInfo;
  studioOptions: StudioOptionsInfo;
  studioImages: StudioImages;
}
