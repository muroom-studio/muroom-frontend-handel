export interface UserNicknameCheckRequestProps {
  nickname: string;
}

export interface UserNicknameCheckResponseProps {
  available: boolean;
}

export interface UserSmsAuthRequestProps {
  phone: string;
}

export interface UserSmsVerifyRequestProps {
  phone: string;
  code: string;
}

export interface UserSmsVerifyResponseProps {
  success: boolean;
}
