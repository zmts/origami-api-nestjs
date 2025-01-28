import { Module } from '@nestjs/common';

import { PostsRepoModule } from '@libs/datalayer/posts';
import { TagsRepoModule } from '@libs/datalayer/tags';

import { AttachTagAction, DetachTagAction } from './actions';
import { TagsController } from './tags.controller';

@Module({
  controllers: [TagsController],
  imports: [TagsRepoModule, PostsRepoModule],
  providers: [AttachTagAction, DetachTagAction],
})
export class TagsModule {}
