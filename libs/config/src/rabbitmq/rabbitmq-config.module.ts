import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RabbitMqConfigService } from './rabbitmq-config.service';
import { default as config } from './rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  providers: [ConfigService, RabbitMqConfigService],
  exports: [ConfigService, RabbitMqConfigService],
})
export class RabbitMqConfigModule {}
