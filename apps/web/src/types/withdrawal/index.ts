// 탈퇴사유 불러오기
// 응답 dto
export interface ReasonOption {
  id: number;
  code: string;
  description: string;
}

export type WithdrawalReasonResponseProps = ReasonOption[];

// 탈퇴신청
// 요청 dto
export interface WithdrawalMusicianRequestProps {
  withdrawalReasonId: number;
  opinion: string;
}
