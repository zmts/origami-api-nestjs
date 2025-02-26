import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { JobType } from '@libs/units/rabbitmq';

@Controller()
export class AppController {
  @MessagePattern(JobType.job)
  async handleTask(@Payload() data: any): Promise<{ status: string; data: any }> {
    console.log('Processing task>>>:', data);
    return { status: 'done', data };
  }
}
