import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, NotFoundException, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';

import { ApiResponseError, AppError } from '../errors';

interface IReqPayload {
  path: Request['path'];
  method: Request['method'];
  query: Request['query'];
  body: Request['body'];
  headers: Request['headers'];
  user: any;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();

    let responseError: ApiResponseError<any>;
    const reqPayload: IReqPayload = {
      path: request.path,
      method: request.method,
      query: request.query,
      body: request.body,
      headers: request.headers,
      user: request.user,
    };

    if (exception instanceof AppError) {
      responseError = this.createAppError(exception, reqPayload);
      this.logError(exception, reqPayload);
    } else if (exception instanceof HttpException) {
      responseError = this.createHttpException(exception, reqPayload);
      this.logError(exception, reqPayload);
    } else {
      responseError = this.createGenericError(exception, reqPayload);
      this.logger.error('Unknown error occurred.', exception);
      console.error(reqPayload);
      console.error(exception);
    }

    httpAdapter.reply(ctx.getResponse(), responseError, responseError.status);
  }

  private logError(exception: Error, reqPayload: IReqPayload): void {
    const skipStatusCodes = new Set([400, 401, 403, 404, 422]);

    const skipLogging =
      (exception instanceof AppError || exception instanceof NotFoundException) && skipStatusCodes.has(exception.getStatus());

    if (!skipLogging) {
      console.error(reqPayload);
      console.error(exception);
    }
  }

  private createAppError(exception: AppError, request: Pick<Request, 'path'>): ApiResponseError<any> {
    const { message, code, entity, description, meta, error } = exception;

    return new ApiResponseError({
      timestamp: new Date().toISOString(),
      path: request.path,
      status: exception.getStatus(),
      code,
      message,
      entity,
      ...(description && description !== message && { description }),
      ...(meta && { meta }),
      error,
    });
  }

  private createHttpException(exception: HttpException, request: Pick<Request, 'path'>): ApiResponseError<any> {
    return new ApiResponseError({
      timestamp: new Date().toISOString(),
      path: request.path,
      status: exception.getStatus(),
      message: exception.message,
    });
  }

  private createGenericError(exception: Error | unknown, request: Pick<Request, 'path'>): ApiResponseError<any> {
    return new ApiResponseError({
      timestamp: new Date().toISOString(),
      path: request.path,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception instanceof Error ? exception.message : 'Unknown error occurred.',
    });
  }
}

export const GlobalExceptionProvider = {
  provide: 'APP_FILTER',
  useClass: GlobalExceptionFilter,
};
