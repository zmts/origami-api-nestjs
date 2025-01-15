import { HttpStatus } from '@nestjs/common';

import { Cookie } from './cookie';

export interface IResponseOptions {
  status?: HttpStatus;
  headers?: Record<string, string>;
  cookies?: Cookie[];
  pagination?: IPaginationResponse;
  meta?: any;
}

export interface IPaginationResponse {
  limit: number;
  total: number;
}
