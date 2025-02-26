import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

import { RabbitQueues } from './queues.enum';
import { TOKEN } from './rabbitmq.config';
import { IRabbitMQConfig, RabbitMqConnection } from './types';

@Injectable()
export class RabbitMqConfigService implements RabbitMqConnection {
  constructor(private readonly configService: ConfigService) {}

  get connectionUrls(): string[] {
    return this.configService.get<string[]>(`${TOKEN}.options.urls`);
  }

  /**
   * - app.connectMicroservice options for initial connection
   */
  getInitOptions(): IRabbitMQConfig {
    return {
      transport: Transport.RMQ,
      options: {
        urls: this.connectionUrls,
        queueOptions: {
          durable: true,
        },
      },
    };
  }

  /**
   * - app.connectMicroservice options initial connection for specific queue
   * - ClientsModule options for specific queue
   */
  getQueueOptions(queue: RabbitQueues): IRabbitMQConfig {
    return {
      transport: Transport.RMQ,
      options: {
        queue,
        urls: this.connectionUrls,
        queueOptions: {
          durable: true,
        },
      },
    };
  }
}
