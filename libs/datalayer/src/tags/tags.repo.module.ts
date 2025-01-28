import { Module } from '@nestjs/common';

import { TagsRepo } from './tags.repo';

@Module({
  providers: [TagsRepo],
  exports: [TagsRepo],
})
export class TagsRepoModule {}
