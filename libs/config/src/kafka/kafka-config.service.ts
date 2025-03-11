import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

import { KafkaGroups } from './kafka-groups.enum';
import { TOKEN } from './kafka.config';
import { IKafkaConfig, KafkaConnection } from './types';

@Injectable()
export class KafkaConfigService implements KafkaConnection {
  constructor(private readonly configService: ConfigService) {}

  get connectionUrls(): string[] {
    return this.configService.get<string[]>(`${TOKEN}.connectionUrls`);
  }

  /**
   * - app.connectMicroservice options initial connection for specific consumer
   * - ClientsModule options for specific consumer
   */
  getOptions(groupId: KafkaGroups): IKafkaConfig {
    return {
      transport: Transport.KAFKA,
      options: {
        client: { brokers: this.connectionUrls },
        consumer: { groupId },
      },
    };
  }
}
