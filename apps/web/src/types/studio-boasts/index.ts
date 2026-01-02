import { PageRequestProps, PaginatedResponse } from '../api';
import { NearestSubwayStationDto } from '../studio';

{
  /* 매물 자랑 목록 조회 */
}

// 요청 dto
export interface StudioBoastsRequestProps extends PageRequestProps {
  sort?: 'likes,desc' | 'latest,desc';
}

// 1) 작성자 정보
interface CreatorUserInfoDto {
  id: string;
  nickname: string;
  instrument: string;
  instagramAccount: string;
}

// 2) 등록된 스튜디오 정보 (플랫폼 내 데이터)
export interface StudioInfoDto {
  id: string;
  name: string;
  roadNameAddress: string;
  lotNumberAddress: string;
  detailedAddress: string;
  thumbnailImageFileUrl: string;
  nearestSubwayStation: NearestSubwayStationDto;
  minPrice: number;
  maxPrice: number;
}

// 3) 미등록 스튜디오 정보 (사용자 입력 데이터)
export interface UnknownStudioInfoDto {
  name: string;
  nearestSubwayStation: NearestSubwayStationDto;
  roadNameAddress: string;
  lotNumberAddress: string;
  detailedAddress: string;
}

export interface StudioBoastsItemProps {
  id: string; // Feed ID
  content: string; // 게시글 본문
  thumbnailImageFileUrl: string;
  imageFileUrls: string[]; // 첨부 이미지 URL 리스트
  isWrittenByRequestUser: boolean; // 요청한 사용자가 작성한 글인지 여부
  isLikedByRequestUser: boolean; // 조회한 유저의 좋아요 여부
  likeCount: number; // 좋아요 개수
  commentCount: number; // 댓글 개수
  createdAt: string; // 생성일시 (ISO 8601 String)
  isStudioUploaded: boolean; // 스튜디오 정보 업로드 여부
  creatorUserInfo: CreatorUserInfoDto; // 작성자 정보

  /**
   * 등록된 스튜디오 정보
   * (isStudioUploaded: true && DB에 등록된 스튜디오일 경우)
   */
  studioInfo?: StudioInfoDto | null;

  /**
   * 미등록 스튜디오 정보 (사용자 직접 입력)
   * (isStudioUploaded: true && DB에 없는 스튜디오일 경우)
   * 상세 주소 정보 포함
   */
  unknownStudioInfo?: UnknownStudioInfoDto | null;
}

// 응답 dto
export type StudioBoastsResponseProps =
  PaginatedResponse<StudioBoastsItemProps>;

{
  /* 내가 쓴 매물 자랑 목록 조회 */
}

// 요청 dto
export type StudioBoastsMyRequestProps = StudioBoastsRequestProps;

// 응답 dto
export type StudioBoastsMyResponseProps = StudioBoastsResponseProps;

{
  /* 내가 쓴 매물 자랑 상세 조회 */
}

// 요청 dto
export interface StudioBoastsDetailRequestProps {
  studioBoastId: string;
}

// 응답 dto
export type StudioBoastsDetailResponseProps = StudioBoastsItemProps;

{
  /* 매물 자랑 등록 */
}
// 요청 dto
export interface CreateStudioBoastsRequestProps {
  content: string;
  studioName: string;
  roadNameAddress: string;
  lotNumberAddress: string;
  detailedAddress: string;
  instagramAccount?: string;
  agreedToEventTerms: boolean;
  studioId?: string;
  imageFileKeys: string[];
}

{
  /* 매물 자랑 수정 */
}
// 요청 dto
export interface EditStudioBoastsRequestProps extends CreateStudioBoastsRequestProps {
  studioBoastId: string;
}

{
  /* 매물 자랑 삭제 */
}
// 요청 dto
export interface DeleteStudioBoastsRequestProps {
  studioBoastId: string;
}

{
  /* 매물 자랑 게시글 좋아요 */
}
export interface StudioBoastsLikesRequestProps {
  studioBoastId: string;
}

{
  /* 매물 자랑 게시글 신고하기 */
}
// 요청 Dto
export interface StudioBoastsReportRequestProps {
  studioBoastId: string;
  reportReasonId: number;
  description: string;
}

{
  /* 매물 자랑 작업실 간단정보 호출하기 */
}
// 요청 dto
export type StudioBoastsSimpleRequestProps = StudioBoastsRequestProps;

export interface StudioBoastsSimpleItemDto {
  id: string;
  thumbnailImageFileUrl: string;
}

// 응답 dto
export type StudioBoastsSimpleResponseProps =
  PaginatedResponse<StudioBoastsSimpleItemDto>;
