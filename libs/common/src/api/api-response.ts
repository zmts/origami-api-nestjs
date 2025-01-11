import { HttpStatus } from '@nestjs/common';

import { Cookie } from './cookie';

export interface IApiPaginationResponse {
  limit: number;
  total: number;
}

interface IApiResponseOptions {
  status?: HttpStatus;
  headers?: Record<string, number | string | ReadonlyArray<string>>;
  cookies?: Cookie[];
  pagination?: IApiPaginationResponse;
  meta?: any;
}

export class ApiResponse<T = any> {
  readonly status: HttpStatus;
  readonly cookies: IApiResponseOptions['cookies'];
  readonly headers: IApiResponseOptions['headers'];
  readonly pagination: IApiResponseOptions['pagination'];
  readonly meta: IApiResponseOptions['meta'];

  constructor(
    readonly data: T,
    options?: IApiResponseOptions,
  ) {
    this.data = this.data || null;
    this.status = options?.status;
    this.cookies = options?.cookies || [];
    this.headers = options?.headers || {};
    this.pagination = options?.pagination;
  }
}
