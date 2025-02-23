import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { JobType } from '@libs/units/rabbitmq';

@Injectable()
export class AppService {
  @MessagePattern(JobType.job)
  handleTask(data: any): { status: string; data: any } {
    console.log('Processing task:', data);
    return { status: 'done', data };
  }
}
