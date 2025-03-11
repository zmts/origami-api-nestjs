import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { RabbitQueues } from '@libs/config/rabbitmq';

import { RmqEvents } from './processor-events.enum';
import { MakeJobResult } from './processor-result.type';
import { MakeJobPayload } from './validations';

@Injectable()
export class ProcessorAgent {
  constructor(@Inject(RabbitQueues.processor) private readonly client: ClientProxy) {}

  async makeJob(payload: MakeJobPayload): Promise<MakeJobResult> {
    const result = await firstValueFrom<MakeJobResult>(this.client.send(RmqEvents.job, payload));
    return result;
  }
}
