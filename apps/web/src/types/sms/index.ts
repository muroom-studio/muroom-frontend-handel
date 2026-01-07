// 회원가입 -> 전화번호 sms 인증번호 받기 요청 dto
export interface SmsSendVerificationRequestProps {
  phone: string;
}

// 회원가입 -> sms 검증 dto
export interface SmsVerifyRequestProps {
  phone: string;
  code: string;
}
