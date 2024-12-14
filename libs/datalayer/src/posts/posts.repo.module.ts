import { Module } from '@nestjs/common';

import { PostsRepoService } from './posts.repo.service';

@Module({
  providers: [PostsRepoService],
  exports: [PostsRepoService],
})
export class PostsRepoModule {}
