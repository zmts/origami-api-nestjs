import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { AppError, ErrorCode } from '@libs/core/errors';

const APP_NAME = process.env?.APP_NAME || 'internal-micro-service';

@Catch(HttpException)
export class RabbitMqValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException): void {
    const status = exception.getStatus();
    const error = exception.getResponse();

    if (status === HttpStatus.BAD_REQUEST && error) {
      console.error(new AppError(ErrorCode.VALIDATION, { error, layer: APP_NAME }));
    } else {
      throw new RpcException(
        new AppError(ErrorCode.SERVER, { message: `${RabbitMqValidationExceptionFilter.name}: unexpected error`, layer: APP_NAME }),
      );
    }
  }
}
