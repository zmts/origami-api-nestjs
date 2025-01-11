import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { ApiResponseInterceptor, validationExceptionFactory } from '@libs/common/api';
import { AllConfig, AppEnv } from '@libs/config';

import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const confService = app.get<ConfigService<AllConfig>>(ConfigService);
  const port = confService.get<AllConfig>('app.port', { infer: true });
  const env = confService.get('app.env', { infer: true });

  /**
   * CORS
   */
  const origin: { [K in AppEnv]?: CorsOptions['origin'] } = {
    [AppEnv.Dev]: true,
    [AppEnv.Stage]: true,
    [AppEnv.Prod]: confService.get('app.frontendUrl', { infer: true }),
  };
  app.enableCors({ origin: origin[env], credentials: true });

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
      exceptionFactory: validationExceptionFactory,
    }),
  );

  await app.listen(port);
}

void bootstrap();
