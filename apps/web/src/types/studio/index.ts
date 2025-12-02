// 작업실 상세 조회 타입 정의
export interface StudioDetailRequestProps {
  studioId: string;
}

export interface StudioBaseInfo {
  studioId: number;
  studioName: string;
  address: string;
  studioLongitude: number;
  studioLatitude: number;
  studioMinPrice: number;
  studioMaxPrice: number;
  nearbySubwayStationInfo: {
    stationName: string;
    lines: {
      lineName: string;
      lineColor: string;
    }[];
  };
  walkingTimeMinutesToSubwayStation: string;
  studioMainImageUrls: string[];
}

export interface StudioBuildingInfo {
  floorType: {
    code: string;
    description: string;
  };
  floorNumber: number;
  isParkingAvailable: boolean; // 주차 가능 여부
  parkingFeeType: 'FREE' | 'PAID' | 'NONE'; // 주차비 형태
  parkingFeeInfo: string; // 주차비 정보
  parkingSpots: number; // 주차 가능 대수 (int32)
  parkingLocationName: string; // 주차장 이름
  parkingLocationAddress: string; // 주차장 주소
  parkingLocationLongitude: number;
  parkingLocationLatitude: number;
  isLodgingAvailable: boolean; // 숙식 가능 여부
  hasFireInsurance: boolean; // 화재 보험 유무
  depositAmount: number; // 보증금 (int32)
  studioBuildingImageUrls: string[]; // 건물 이미지 URL 목록
}

export interface StudioNotice {
  ownerNickname: string; // 호스트 닉네임
  experienceYears: number; // 경력 (int32)
  isIdentityVerified: boolean; // 본인 인증 완료 여부
  introduction: string; // 소개글
}

export interface StudioRoomItem {
  roomId: number; // integer(int64)
  roomName: string; // 방 이름
  isAvailable: boolean; // 입실 가능 여부
  availableAt: string; // 입실 가능일 (Date string, e.g. "2023-10-01")
  widthMm: number; // 가로 길이 (mm)
  heightMm: number; // 세로 길이 (mm)
  roomBasePrice: number; // 기본 가격
}

// 스튜디오 방 정보 그룹
export interface StudioRoomsInfo {
  forbiddenInstruments: string[]; // 연주 금지 악기 목록
  roomImageUrls: string[]; // 방 관련 이미지 URL 목록
  rooms: StudioRoomItem[]; // 방 목록
}

// 개별 옵션 아이템 (공통/개별 옵션 내부 구조가 동일함)
export interface StudioOptionItem {
  code: string; // 옵션 코드 (예: "WIFI")
  description: string; // 옵션 설명 (예: "와이파이")
  iconImageUrl: string; // 아이콘 이미지 URL
}

// 스튜디오 옵션 그룹
export interface StudioOptionsInfo {
  commonOptions: StudioOptionItem[]; // 공통 옵션 목록
  individualOptions: StudioOptionItem[]; // 개별 옵션 목록
}

export interface StudioDetailResponseProps {
  studioBaseInfo: StudioBaseInfo; // 1. 기본 정보
  studioBuildingInfo: StudioBuildingInfo; // 2. 건물 정보
  studioNotice: StudioNotice; // 3. 안내 사항
  studioRooms: StudioRoomsInfo; // 4. 방 정보
  studioOptions: StudioOptionsInfo; // 5. 옵션 정보
}
