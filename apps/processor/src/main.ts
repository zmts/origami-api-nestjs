import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { AllConfig } from '@libs/config';
import { RabbitQueues } from '@libs/units/rabbitmq';

import { AppModule } from './app';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  const configService = app.get<ConfigService<AllConfig>>(ConfigService);
  const rabbitMQConfig = configService.get('rabbitmq', { infer: true });

  app.connectMicroservice<MicroserviceOptions>({
    transport: rabbitMQConfig.transport,
    options: {
      ...rabbitMQConfig.options,
      queue: RabbitQueues.processor,
    },
  });

  await app.startAllMicroservices();
  logger.log('Processor is listening for tasks...');
}

void bootstrap();
