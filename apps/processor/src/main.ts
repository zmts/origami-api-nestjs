import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { RabbitMqConfigService } from '@libs/config';
import { RabbitQueues } from '@libs/config/rabbitmq';

import { AppModule } from './app';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  const rabbitMqConfig = app.get(RabbitMqConfigService).getQueueOptions(RabbitQueues.processor);
  app.connectMicroservice<MicroserviceOptions>(rabbitMqConfig);
  await app.startAllMicroservices();

  logger.log('Processor is listening for tasks...');
}

void bootstrap();
