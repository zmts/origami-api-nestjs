import { DynamicModule, Module } from '@nestjs/common';

import { MailSenderService } from './mail-sender.service';
import { MODULE_OPTIONS_TOKEN } from './token';
import { SenderServiceOptions } from './types';

@Module({})
export class MailSenderModule {
  static forRoot(options: SenderServiceOptions): DynamicModule {
    return {
      module: MailSenderModule,
      exports: [MailSenderService],
      global: true,
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
        MailSenderService,
      ],
    };
  }

  static forRootAsync(options: {
    imports?: any[];
    useFactory: (...args: any[]) => Promise<SenderServiceOptions> | SenderServiceOptions;
    inject?: any[];
  }): DynamicModule {
    return {
      module: MailSenderModule,
      imports: options.imports || [],
      exports: [MailSenderService],
      global: true,
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useFactory: async (...args: any[]) => options.useFactory(...args),
          inject: options.inject || [],
        },
        MailSenderService,
      ],
    };
  }
}
