import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { AllConfig } from '@libs/config';
import { PostsRepoModule } from '@libs/datalayer/posts';
import { RabbitQueues } from '@libs/units/rabbitmq';

import { CreatePostAction, GetPostAction } from './actions';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    PostsRepoModule,
    ClientsModule.registerAsync([
      {
        name: RabbitQueues.processor,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService<AllConfig>) => {
          const config = configService.get('rabbitmq', { infer: true });
          return {
            transport: config.transport,
            options: {
              ...config.options,
              queue: RabbitQueues.processor,
            },
          };
        },
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [GetPostAction, CreatePostAction],
})
export class PostsModule {}
