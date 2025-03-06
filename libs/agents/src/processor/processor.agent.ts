import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ProcessorEvents } from '@libs/agents/processor';
import { RabbitQueues } from '@libs/config/rabbitmq';

import { MakeJobResult } from './processor-result.type';
import { MakeJobPayload } from './validations';

@Injectable()
export class ProcessorAgent {
  constructor(@Inject(RabbitQueues.processor) private readonly client: ClientProxy) {}

  async makeJob(payload: MakeJobPayload): Promise<MakeJobResult> {
    const result = await firstValueFrom<MakeJobResult>(this.client.send(ProcessorEvents.job, payload));
    return result;
  }
}
