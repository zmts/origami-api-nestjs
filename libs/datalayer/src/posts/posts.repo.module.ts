import { Module } from '@nestjs/common';

import { PostsRepo } from './posts.repo';

@Module({
  providers: [PostsRepo],
  exports: [PostsRepo],
})
export class PostsRepoModule {}
