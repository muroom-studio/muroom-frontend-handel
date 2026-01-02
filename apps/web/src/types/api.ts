import { HttpErrorStatusCode, HttpSuccessStatusCode } from './http';

export interface ApiErrorData {
  code: string;
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
    super(response.message);

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

export interface CommonImageUploadRequestProps {
  fileName: string;
  contentType: string;
}

export interface CommonImageUploadResponseProps {
  presignedPutUrl: string;
  fileKey: string;
}
