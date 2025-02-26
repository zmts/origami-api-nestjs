import { Module } from '@nestjs/common';

import { RabbitMqConfigModule } from '@libs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [RabbitMqConfigModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
