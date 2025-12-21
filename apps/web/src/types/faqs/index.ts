import { PageRequestProps, PaginationInfo } from '../api';

// faq 카테고리 아이템
export interface FaqCategoryItem {
  id: number;
  code: string;
  name: string;
}

// faq 카테고리 호출 응답 dto
export type FaqCategoriesResponseProps = FaqCategoryItem[];

// faq 아이템 검색 요청 dto
export interface FaqRequestProps extends PageRequestProps {
  keyword?: string;
  categoryId?: string;
}

// 개별 faq 아이템
export interface FaqItem {
  faqId: number;
  category: FaqCategoryItem;
  question: string;
  answer: string;
}

// faq 응답 dto
export interface FaqResponseProps {
  content: FaqItem[];
  pagination: PaginationInfo;
}
