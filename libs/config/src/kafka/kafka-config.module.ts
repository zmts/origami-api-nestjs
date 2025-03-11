import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { KafkaConfigService } from './kafka-config.service';
import { default as config } from './kafka.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  providers: [ConfigService, KafkaConfigService],
  exports: [ConfigService, KafkaConfigService],
})
export class KafkaConfigModule {}
