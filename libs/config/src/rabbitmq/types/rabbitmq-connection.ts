import { MicroserviceOptions } from '@nestjs/microservices';

import { RabbitQueues } from '../queues.enum';

export interface RabbitMqConnection {
  getInitOptions: () => MicroserviceOptions;
  getQueueOptions: (queue: RabbitQueues) => MicroserviceOptions;
}
