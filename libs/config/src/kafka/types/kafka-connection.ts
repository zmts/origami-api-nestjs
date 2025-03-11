import { MicroserviceOptions } from '@nestjs/microservices';

import { KafkaGroups } from '../kafka-groups.enum';

export interface KafkaConnection {
  getOptions: (consumer: KafkaGroups) => MicroserviceOptions;
}
