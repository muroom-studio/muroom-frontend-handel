// 사용자 로그인

export type ProviderType = 'KAKAO' | 'NAVER' | 'GOOGLE';

export type LoginType = 'LOGIN' | 'SIGNUP_REQUIRED';

export interface MusicianLoginRequestProps {
  provider: string;
  providerId: string;
}

export interface MusicianLoginResponseProps {
  type: LoginType;
  accessToken?: string;
  signupToken?: string;
  userId?: number;
  provider: ProviderType;
}

// ==================================================
// ==================================================
// 사용자 회원가입

export interface MusicianRegisterRequestProps {
  name: string;
  phoneNumber: string;
  detailJuso?: string;
  juso?: string;
  studioName?: string;
  nickname: string;
  instrumentId: number;
  termIds: number[];
  signupToken: string;
}

export interface MusicianRegisterResponseProps {
  accessToken: string;
  musicianId: number;
}

// ==================================================
// ==================================================
// 홈 -> 로그인 후 닉네임, instrument 얻기
export interface MusicianInstrument {
  code: string;
  description: string;
}

// 뮤지션 응답 DTO
export interface MusicianMeResponseDto {
  musicianId: number;
  nickname: string;
  profileImageUrl: string;
  musicianInstrument: MusicianInstrument;
}
