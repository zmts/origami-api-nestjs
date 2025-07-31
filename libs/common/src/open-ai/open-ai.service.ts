import { Inject, Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatModel } from 'openai/src/resources/shared';

import { MODULE_OPTIONS_TOKEN } from './token';
import { OpenAIServiceOptions } from './types';

@Injectable()
export class OpenAiService {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private readonly options: OpenAIServiceOptions) {}

  private get client(): OpenAI {
    return new OpenAI({
      apiKey: this.options.apiKey,
    });
  }

  async ask(prompt: string, options: { model: ChatModel; temperature?: number } = { model: 'gpt-4.1-nano' }): Promise<string> {
    const { model, ...restOptions } = options;

    const response = await this.client.responses.create({
      model,
      input: prompt,
      ...restOptions,
    });

    if (response.error) {
      this.logger.error(response.error);
    }

    return response?.output_text || null;
  }
}
