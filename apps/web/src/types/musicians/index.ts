// 회원가입 -> 닉네임 중복확인 요청 dto
export interface MusiciansNicknameCheckRequestProps {
  nickname: string;
}

export type MusicianInstrument = {
  code: string;
  description: string;
};

// 회원가입 -> 전화번호 중복확인 요청 dto
export interface MusiciansPhoneCheckRequestProps {
  phone: string;
}

// 뮤지션 응답 DTO
export interface MusiciansMeResponseProps {
  musicianId: number;
  nickname: string;
  profileImageUrl: string;
  musicianInstrument: MusicianInstrument;
}

// 뮤지션 회원가입
// 요청 dto
export interface MusiciansRegisterRequestProps {
  name: string;
  smsVerifyToken: string;
  detailJuso?: string;
  juso?: string;
  studioName?: string;
  nickname: string;
  instrumentId: number;
  termIds: number[];
  signupToken: string;
}

// 응답 dto
export interface MusiciansRegisterResponseProps {
  accessToken: string;
  refreshToken: string;
  musicianId: number;
}

// ==================================================
// ==================================================
// 내 정보 -> 프로필 -> 프로필 조회
// 응답 DTO
export interface MusiciansMeDetailResponseProps {
  musicianId: number;
  nickname: string;
  phone: string;
  musicianInstrument: MusicianInstrument;
  myStudio: {
    name: string;
    roadAddress: string;
    detailAddress: string;
  };
  snsAccount: {
    code: string;
    description: string;
  };
}

// 내 정보 -> 프로필 -> 프로필 수정
// 요청 dto
export interface MusiciansMeDetailRequestProps {
  nickname?: string;
  instrumentId?: number;
  smsVerifyToken?: string;
  studioName?: string;
  roadAddress?: string;
  detailAddress?: string;
}
