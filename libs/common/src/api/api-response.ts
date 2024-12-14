import { HttpStatus } from '@nestjs/common';

import { Cookie } from './cookie';

export interface IApiPaginationResponse {
  limit: number;
  total: number;
}

export interface IApiSuccessResponse<T> {
  data: T;
  status: HttpStatus;
  pagination?: IApiPaginationResponse;
  meta?: any;
}

interface IResponseOptions {
  status?: HttpStatus;
  headers?: Record<string, number | string | ReadonlyArray<string>>;
  cookies?: Record<string, Cookie>;
  pagination?: IApiPaginationResponse;
  meta?: any;
}

export class ApiResponse<T = any> {
  readonly status: HttpStatus;
  readonly cookies: IResponseOptions['cookies'];
  readonly headers: IResponseOptions['headers'];
  readonly pagination: IResponseOptions['pagination'];
  readonly meta: IResponseOptions['meta'];

  constructor(
    readonly data: T,
    options?: IResponseOptions,
  ) {
    this.data = this.data || null;
    this.status = options?.status;
    this.cookies = options?.cookies || {};
    this.headers = options?.headers || {};
    this.pagination = options?.pagination;
  }
}
