import { CallHandler, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Response as HttpResponse } from 'express';
import { map, Observable } from 'rxjs';

import { Resource } from './resource';
import { ResourceList } from './resource-list';
import { IPaginationResponse } from './types';

interface IApiResponse {
  data: any;
  status: HttpStatus;
  pagination?: IPaginationResponse;
  meta?: any;
}

@Injectable()
export class ApiResponseInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => this.transform(context.switchToHttp().getResponse(), data)));
  }

  private transform(response: HttpResponse, resource: Resource): IApiResponse {
    if (resource) {
      const isValidResource = resource instanceof Resource;
      const isValidResourceList = resource instanceof ResourceList;
      const isValidInstance = isValidResource || isValidResourceList;

      if (!isValidInstance) {
        throw new Error('Invalid resource instance');
      }

      const apiResponse = resource.toResponse();

      if (apiResponse.cookies?.length) {
        for (const cookie of apiResponse.cookies) {
          response.cookie(cookie.name, cookie.value, cookie.options);
        }
      }

      const headers = apiResponse.headers || {};
      for (const headerKey in headers) {
        response.header(headerKey, headers[headerKey]);
      }

      return {
        status: apiResponse.status || response.statusCode,
        data: apiResponse.data,
        pagination: apiResponse.pagination,
        meta: apiResponse.meta,
      };
    }
  }
}
