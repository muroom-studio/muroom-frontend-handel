import { HttpErrorStatusCode, HttpSuccessStatusCode } from './http';

export interface ApiError {
  message: string;
}

type SuccessResponse<T> = {
  code: HttpSuccessStatusCode;
  data: T;
  message: string;
  error?: never;
};

type ErrorResponse = {
  code: HttpErrorStatusCode;
  data?: never;
  error: ApiError;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
