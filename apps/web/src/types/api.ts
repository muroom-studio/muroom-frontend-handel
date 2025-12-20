import { HttpErrorStatusCode, HttpSuccessStatusCode } from './http';

export interface ApiErrorDetail {
  field: string;
  issue: string;
}

export interface ApiErrorData {
  code: string;
  details?: ApiErrorDetail[];
}

type SuccessResponse<T> = {
  status: HttpSuccessStatusCode;
  data: T;
  message: string;
};

type ErrorResponse = {
  status: HttpErrorStatusCode;
  data?: ApiErrorData;
  message: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export class ApiRequestError extends Error {
  status: number;
  code?: string;

  constructor(response: ErrorResponse) {
    const detailedMessage = response.data?.details?.[0]?.issue;
    const superMessage =
      detailedMessage || response.message || '알 수 없는 오류가 발생했습니다.';

    super(superMessage);

    this.name = 'ApiRequestError';
    this.status = response.status;
    this.code = response.data?.code;
  }
}

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
