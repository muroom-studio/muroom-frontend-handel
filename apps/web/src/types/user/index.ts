// 회원가입 -> 닉네임 중복확인 요청 dto
export interface UserNicknameCheckRequestProps {
  nickname: string;
}

// 회원가입 -> 닉네임 중복확인 응답 dto
export interface UserNicknameCheckResponseProps {
  available: boolean;
}

// 회원가입 -> 전화번호 sms 인증번호 받기 요청 dto
export interface UserSmsAuthRequestProps {
  phone: string;
}

// 회원가입 -> sms 인증 요청 dto
export interface UserSmsVerifyRequestProps {
  phone: string;
  code: string;
}
