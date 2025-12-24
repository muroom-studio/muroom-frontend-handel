import { PaginationInfo } from '../api';

/* 1:1 문의 카테고리 전체 조회 */
export interface InquiryCategoryItem {
  id: number;
  code: string;
  name: string;
}

export type InquiryCategoryResponseProps = InquiryCategoryItem[];

/* 내 1:1 문의 목록 조회 */
export interface InquiryItem {
  id: number;
  title: string;
  content: string;
  status: 'PROCESSING' | 'COMPLETED';
  category: {
    code: string;
    name: string;
  };
  images: {
    id: number;
    imageFileUrl: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

// 응답 dto
export interface InquiriesMyResponseProps {
  content: InquiryItem[];
  pagination: PaginationInfo;
}

/* 1:1 문의 상세 조회 */
// 요청 dto
export interface InquiriesInquiryIdRequestProps {
  inquiryId: number;
}

//응답 dto
export interface InquiriesInquiryIdResponseProps {}

/* 1:1 문의 등록 사진 등록 (s3 버킷용) */

// 요청 dto
export interface InquiriesPresignedUrlRequestProps {
  fileName: string;
  contentType: string;
}

// 응답 dto
export interface InquiriesPresignedUrlResponseProps {
  presignedPutUrl: string;
  fileKey: string;
}

/* 1:1 문의 등록 */
export interface InquiriesRequestProps {
  categoryId: number;
  title: string;
  content: string;
  imageKeys: string[];
}
