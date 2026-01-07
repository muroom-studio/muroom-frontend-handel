// 사용자 로그인

export type ProviderType = 'KAKAO' | 'NAVER' | 'GOOGLE';

export type LoginType = 'LOGIN' | 'SIGNUP_REQUIRED';

export interface AuthMusicianLoginRequestProps {
  provider: string;
  providerId: string;
}

export interface AuthMusicianLoginResponseProps {
  type: LoginType;
  accessToken?: string;
  refreshToken?: string;
  signupToken?: string;
  userId?: number;
  provider: ProviderType;
}
