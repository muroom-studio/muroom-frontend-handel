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
  id: string;
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
  reply: {
    id: string;
    content: string;
    imageUrls: {
      id: string;
      imageFileUrl: string;
    }[];
  } | null;
  createdAt: string;
  updatedAt: string;
}

// 응답 dto
export interface InquiriesMyResponseProps {
  content: InquiryItem[];
  pagination: PaginationInfo;
}

/* 내 1:1 문의 목록 검색 */
// 요청 dto
export interface InquiriesSearchRequestProps {
  keyword: string;
}

// 응답 dto
export interface InquiriesSearchResponseProps {
  content: InquiryItem[];
  pagination: PaginationInfo;
}

/* 1:1 문의 상세 조회 */
// 요청 dto
export interface InquiriesDetailRequestProps {
  inquiryId: string;
}

//응답 dto
export type InquiriesDetailResponseProps = InquiryItem;

/* 1:1 문의 등록 */
export interface InquiriesRequestProps {
  categoryId: number;
  title: string;
  content: string;
  imageKeys: string[];
}
