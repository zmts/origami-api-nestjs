import { Transport } from '@nestjs/microservices';

import { RabbitQueues } from '../queues.enum';

export interface IRabbitMQConfig {
  transport: Transport.RMQ;
  options: {
    urls: string[];
    queueOptions: {
      durable: boolean;
    };
    queue?: RabbitQueues;
  };
}
