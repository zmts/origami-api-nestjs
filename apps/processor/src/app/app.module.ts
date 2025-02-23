import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { rabbitMQConfig } from '@libs/config';

import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitMQConfig],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
