import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { MakeJobResult } from '../processor-result.type';
import { MakeJobPayload } from '../validations';

import { TOKEN } from './agent.token';
import { KafkaTopics } from './topics.enum';

@Injectable()
export class ProcessorAgent {
  constructor(@Inject(TOKEN) private readonly client: ClientKafka) {}

  async makeJob(payload: MakeJobPayload): Promise<MakeJobResult> {
    const result = await firstValueFrom<MakeJobResult>(this.client.emit(KafkaTopics.processor, payload));
    return result;
  }
}
