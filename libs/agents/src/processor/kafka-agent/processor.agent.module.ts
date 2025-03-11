import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { IKafkaConfig, KafkaConfigModule, KafkaConfigService } from '@libs/config';
import { KafkaGroups } from '@libs/config/kafka';

import { TOKEN } from './agent.token';
import { ProcessorKafkaAgent } from './processor.agent';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: TOKEN,
        imports: [ConfigModule, KafkaConfigModule],
        inject: [KafkaConfigService],
        useFactory: (configService: KafkaConfigService): IKafkaConfig => configService.getOptions(KafkaGroups.processor),
      },
    ]),
  ],
  providers: [ProcessorKafkaAgent],
  exports: [ProcessorKafkaAgent],
})
export class ProcessorAgentModule {}
