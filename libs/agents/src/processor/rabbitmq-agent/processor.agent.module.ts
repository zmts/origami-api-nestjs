import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { IRabbitMQConfig, RabbitMqConfigModule, RabbitMqConfigService, RabbitQueues } from '@libs/config/rabbitmq';

import { TOKEN } from './agent.token';
import { ProcessorAgent } from './processor.agent';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: TOKEN,
        imports: [ConfigModule, RabbitMqConfigModule],
        inject: [RabbitMqConfigService],
        useFactory: (configService: RabbitMqConfigService): IRabbitMQConfig => configService.getQueueOptions(RabbitQueues.processor),
      },
    ]),
  ],
  providers: [ProcessorAgent],
  exports: [ProcessorAgent],
})
export class ProcessorAgentModule {}
