import { Injectable } from '@nestjs/common';

import { BaseAction, ResourceList } from '@libs/core/api';
import { PostsRepo } from '@libs/datalayer/posts';

import { PostContract } from '../inout/contracts';
import { PostResource } from '../inout/resources';
import { ListPostsFilterDto } from '../inout/validations';

@Injectable()
export class ListPostsAction extends BaseAction<[ListPostsFilterDto], ResourceList<PostContract>> {
  constructor(private postsRepo: PostsRepo) {
    super();
  }

  async run(query: ListPostsFilterDto): Promise<ResourceList<PostContract>> {
    const list = await this.postsRepo.find({ ...query });
    return PostResource.list<PostContract>(list);
  }
}
