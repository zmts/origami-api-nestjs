import { HttpStatus } from '@nestjs/common';

import { IResponseOptions } from './types';

export class ApiResponse<T = any> {
  readonly list: T[];
  readonly status: HttpStatus;
  readonly cookies: IResponseOptions['cookies'];
  readonly headers: IResponseOptions['headers'];
  readonly pagination: IResponseOptions['pagination'];
  readonly meta: IResponseOptions['meta'];

  constructor(
    readonly data: { data?: T; list?: T[] },
    options?: IResponseOptions,
  ) {
    this.data = data?.data;
    this.list = data?.list;
    this.status = options?.status;
    this.cookies = options?.cookies || [];
    this.headers = options?.headers || {};
    this.pagination = options?.pagination;
    this.meta = options?.meta;
  }
}
