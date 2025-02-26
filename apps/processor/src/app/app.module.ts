import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { rabbitMQConfig } from '@libs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitMQConfig],
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
