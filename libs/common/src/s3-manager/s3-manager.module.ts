import { DynamicModule, Module } from '@nestjs/common';

import { S3ManagerService } from './s3-manager.service';
import { MODULE_OPTIONS_TOKEN } from './token';
import { S3ManagerServiceOptions } from './types';

@Module({})
export class S3ManagerModule {
  static forRoot(options: S3ManagerServiceOptions): DynamicModule {
    return {
      module: S3ManagerModule,
      exports: [S3ManagerService],
      global: true,
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
        S3ManagerService,
      ],
    };
  }

  static forRootAsync(options: {
    imports?: any[];
    useFactory: (...args: any[]) => Promise<S3ManagerServiceOptions> | S3ManagerServiceOptions;
    inject?: any[];
  }): DynamicModule {
    return {
      module: S3ManagerModule,
      imports: options.imports || [],
      exports: [S3ManagerService],
      global: true,
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useFactory: async (...args: any[]) => options.useFactory(...args),
          inject: options.inject || [],
        },
        S3ManagerService,
      ],
    };
  }
}
