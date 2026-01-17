import { Injectable, UseGuards } from '@nestjs/common';

import { BaseAction } from '@libs/core/api';
import { PostsRepo } from '@libs/datalayer/posts';

import { PostResource } from '../inout/resources';
import { ListPostsFilterDto } from '../inout/validations';

@Injectable()
export class ListPostsAction extends BaseAction<[ListPostsFilterDto], PostResource[]> {
  constructor(private postsRepo: PostsRepo) {
    super();
  }

  @UseGuards()
  async run(query: ListPostsFilterDto): Promise<PostResource[]> {
    const list = await this.postsRepo.find({ ...query });
    return list.map(item => new PostResource(item));
  }
}
