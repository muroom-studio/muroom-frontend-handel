import { PageRequestProps, PaginatedResponse } from '@/types/api';

{
  /* 댓글 목록 페이지네이션 조회 */
}
// 요청 dto
export interface StudioBoastsCommentsRequestProps extends PageRequestProps {
  studioBoastId: string;
}

// 작성자 및 태그된 유저 정보
export interface CreatorUserInfoDto {
  id: string;
  nickname: string;
  instrumentInfo: {
    id: string;
    code: string;
    description: string;
  };
}

export interface TaggedUserInfoDto {
  id: string;
  nickname: string;
}

export interface StudioBoastsReplyDto {
  id: string;
  content: string;
  createdAt: string;
  isSecret: boolean;
  isDeleted: boolean;
  isVisible: boolean;
  creatorUserInfo: CreatorUserInfoDto;
  taggedUserInfo?: TaggedUserInfoDto | null;
  isWrittenByRequestUser: boolean;
  isLikedByRequestUser: boolean;
  likeCount: number;
}

// 댓글 (Comment) DTO
export interface StudioBoastsCommentDto extends StudioBoastsReplyDto {
  replies: StudioBoastsReplyDto[];
}

// 최종 응답 타입 dto
export type StudioBoastsCommentsResponseProps =
  PaginatedResponse<StudioBoastsCommentDto>;

{
  /* 댓글 생성 */
}
// 요청 dto
export interface StudioBoastsCreateCommentsRequestProps {
  studioBoastId: string;
  content: string;
  isSecret: boolean;
  parentId: string;
  taggedUserId: string;
}

{
  /* 댓글 수정 */
}
// 요청 dto
export interface StudioBoastsEditCommentsRequestProps {
  studioBoastId: string;
  commentId: string;
  content: string;
  isSecret: boolean;
}

{
  /* 댓글 삭제 */
}
// 요청 dto
export interface StudioBoastsDeleteCommentsRequestProps {
  studioBoastId: string;
  commentId: string;
}

{
  /* 댓글 좋아요 */
}
// 요청 dto
export interface StudioBoastsCommentsLikesRequestProps {
  studioBoastId: string;
  commentId: string;
}

{
  /* 댓글 신고 */
}
// 요청 dto
export interface StudioBoastsCommentsReportRequestProps {
  studioBoastId: string;
  commentId: string;
  reportReasonId: string;
  description: string;
}
