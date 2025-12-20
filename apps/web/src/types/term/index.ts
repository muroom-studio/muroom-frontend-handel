/**
 * 약관 종류 (Terms Type)
 * - TERMS_OF_USE: 서비스 이용약관
 * - PRIVACY_COLLECTION: 개인정보 수집 및 이용
 * - PRIVACY_PROCESSING: 개인정보 처리방침
 * - MARKETING_RECEIVE: 마케팅 정보 수신
 */
export enum TermCode {
  TERMS_OF_USE = 'TERMS_OF_USE',
  PRIVACY_COLLECTION = 'PRIVACY_COLLECTION',
  PRIVACY_PROCESSING = 'PRIVACY_PROCESSING',
  MARKETING_RECEIVE = 'MARKETING_RECEIVE',
}

/**
 * 대상 역할 (Target Role)
 * - OWNER: 호스트 (공간 등록자)
 * - MUSICIAN: 뮤지션 (공간 대여자)
 */
export enum TargetRole {
  OWNER = 'OWNER',
  MUSICIAN = 'MUSICIAN',
}

/**
 * 약관 코드 상세 정보
 */
interface TermCodeDetail {
  code: TermCode; // ⭐️ 위에서 정의한 Enum 사용
  description: string;
  required?: boolean;
}

/**
 * 대상 역할 상세 정보
 */
interface TargetRoleDetail {
  code: TargetRole; // ⭐️ 위에서 정의한 Enum 사용
  description: string;
}

export interface TermItemProps {
  termId: number;
  code: TermCodeDetail;
  targetRole: TargetRoleDetail;
  version: string;
  isMandatory: boolean;
  effectiveAt: string;
}

// 회원가입 -> 약관 목록 불러오기 응답 dto
export type TermsMusicianSignupResponseProps = TermItemProps[];

// 약관 상세 요청 dto
export interface TermsTermIdRequestProps {
  termId: number;
}

// 약관 상세 응답 dto
export interface TermsTermIdResponseProps {
  title: string;
  termId: number;
  content: string;
}
