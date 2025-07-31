import { DynamicModule, Module } from '@nestjs/common';

import { OpenAiService } from './open-ai.service';
import { MODULE_OPTIONS_TOKEN } from './token';
import { OpenAIServiceOptions } from './types';

@Module({
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {
  static forRoot(options: OpenAIServiceOptions): DynamicModule {
    return {
      module: OpenAiModule,
      exports: [OpenAiService],
      global: true,
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
        OpenAiService,
      ],
    };
  }

  static forRootAsync(options: {
    imports?: any[];
    useFactory: (...args: any[]) => Promise<OpenAIServiceOptions> | OpenAIServiceOptions;
    inject?: any[];
  }): DynamicModule {
    return {
      module: OpenAiModule,
      imports: options.imports || [],
      exports: [OpenAiService],
      global: true,
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useFactory: async (...args: any[]) => options.useFactory(...args),
          inject: options.inject || [],
        },
        OpenAiService,
      ],
    };
  }
}
