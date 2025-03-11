import { Transport } from '@nestjs/microservices';

export interface IKafkaConfig {
  transport: Transport.KAFKA;
  options: {
    client: {
      brokers: string[];
    };
    consumer?: {
      groupId: string;
    };
  };
}
