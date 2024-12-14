import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ApiResponseInterceptor, exceptionFactory } from '@libs/common/api';

import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  /**
   * INTERCEPTORS
   */
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  /**
   * VALIDATION
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory,
    }),
  );

  await app.listen(3000);
}

void bootstrap();
