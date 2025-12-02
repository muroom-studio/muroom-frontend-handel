import { HttpErrorStatusCode, HttpSuccessStatusCode } from './http';

export interface ApiError {
  message: string;
}

type SuccessResponse<T> = {
  status: HttpSuccessStatusCode;
  data: T;
  message: string;
  error?: never;
};

type ErrorResponse = {
  status: HttpErrorStatusCode;
  data?: never;
  error: ApiError;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// ======================================================================
// ======================================================================
// 페이지네이션 관련 타입 정의
export interface PageRequestProps {
  page: number;
  size: number;
}

export interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  pagination: PaginationInfo;
}
