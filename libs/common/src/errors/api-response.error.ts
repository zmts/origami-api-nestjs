import { HttpStatus } from '@nestjs/common';

export interface ApiResponseError<E> {
  timestamp: string;
  path: string;
  status: HttpStatus;
  code: string;
  message: string;
  entity: string;
  description: string;
  meta: any;
  error: E;
}

export class ApiResponseError<E> implements ApiResponseError<E> {
  constructor(partial: Partial<ApiResponseError<E>>) {
    Object.assign(this, partial);
  }
}
