import { Module } from '@nestjs/common';

import { ProcessorAgentModule } from '@libs/agents/processor/rabbitmq-agent';
import { PostsRepoModule } from '@libs/datalayer/posts';

import { CreatePostAction, GetPostAction, ListPostsAction } from './actions';
import { PostsController } from './posts.controller';

@Module({
  imports: [PostsRepoModule, ProcessorAgentModule],
  controllers: [PostsController],
  providers: [GetPostAction, CreatePostAction, ListPostsAction],
})
export class PostsModule {}
