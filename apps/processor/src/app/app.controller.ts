import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MakeJobResult } from '@libs/agents/processor';
import { RmqEvents } from '@libs/agents/processor/rabbitmq-agent';
import { MakeJobPayload } from '@libs/agents/processor/validations';
import { RabbitMqValidationExceptionFilter } from '@libs/core/rabbitmq';

@UseFilters(RabbitMqValidationExceptionFilter)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller()
export class AppController {
  @MessagePattern(RmqEvents.job)
  handleJob(@Payload() payload: MakeJobPayload): MakeJobResult {
    console.log(`Processing event: '${RmqEvents.job}',`, 'payload:', payload);
    return { success: true, data: { content: 'job result' } };
  }
}
