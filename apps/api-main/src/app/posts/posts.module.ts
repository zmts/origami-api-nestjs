import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { IRabbitMQConfig, RabbitMqConfigModule, RabbitMqConfigService } from '@libs/config';
import { RabbitQueues } from '@libs/config/rabbitmq';
import { PostsRepoModule } from '@libs/datalayer/posts';

import { CreatePostAction, GetPostAction } from './actions';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    PostsRepoModule,
    ClientsModule.registerAsync([
      {
        name: RabbitQueues.processor,
        imports: [ConfigModule, RabbitMqConfigModule],
        inject: [RabbitMqConfigService],
        useFactory: (configService: RabbitMqConfigService): IRabbitMQConfig => configService.getQueueOptions(RabbitQueues.processor),
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [GetPostAction, CreatePostAction],
})
export class PostsModule {}
