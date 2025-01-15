import { HttpStatus } from '@nestjs/common';

import { IResponseOptions } from './types';

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
    this.cookies = options?.cookies || [];
    this.headers = options?.headers || {};
    this.pagination = options?.pagination;
  }
}
