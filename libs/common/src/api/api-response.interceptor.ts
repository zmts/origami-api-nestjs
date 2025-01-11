import { CallHandler, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Response as HttpResponse } from 'express';
import { map, Observable } from 'rxjs';

import { IApiPaginationResponse } from './api-response';
import { Resource } from './resource';
import { ResourceList } from './resource-list';

interface IApiResponse {
  data: any;
  status: HttpStatus;
  pagination?: IApiPaginationResponse;
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

      if (apiResponse.cookies) {
        // const cookies = Object.values(apiResponse.cookies);
        // this.setCookies(response, cookies);
      }

      const headers = apiResponse.headers;

      if (typeof headers === 'object' && headers !== null) {
        // this.setHeaders(response, headers);
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
