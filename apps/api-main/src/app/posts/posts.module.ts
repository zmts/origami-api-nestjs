import { Module } from '@nestjs/common';

import { PostsRepoModule } from '@libs/datalayer/posts';

import { CreatePostAction, GetPostAction } from './actions';
import { PostsController } from './posts.controller';

@Module({
  imports: [PostsRepoModule],
  controllers: [PostsController],
  providers: [GetPostAction, CreatePostAction],
})
export class PostsModule {}
