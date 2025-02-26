import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { EventType } from '@libs/config/rabbitmq';

@Controller()
export class AppController {
  @MessagePattern(EventType.job)
  handleJob(@Payload() data: any): { status: string; data: any } {
    console.log('Processing task>>>:', data);
    return { status: 'done', data };
  }
}
