import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { EventType } from '@libs/units/rabbitmq';

@Controller()
export class AppController {
  @MessagePattern(EventType.job)
  async handleTask(@Payload() data: any): Promise<{ status: string; data: any }> {
    console.log('Processing task>>>:', data);
    return { status: 'done', data };
  }
}
