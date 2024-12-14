import { HttpStatus } from '@nestjs/common';

export interface IApiErrorResponse<T> {
  message: T;
  status: HttpStatus;
  code: string;
  error: string;
}

export class ApiResponseError implements IApiErrorResponse<string> {
  code: string;
  error: string;
  message: string;
  status: HttpStatus;
}
