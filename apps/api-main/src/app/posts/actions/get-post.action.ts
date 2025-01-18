import { Injectable, UseGuards } from '@nestjs/common';

import { BaseAction } from '@libs/common/api';
import { PostUuid } from '@libs/common/types/global';
import { PostsRepo } from '@libs/datalayer/posts';

import { PostResource } from '../inout/resources';

@Injectable()
export class GetPostAction extends BaseAction<[PostUuid], PostResource> {
  constructor(private postsRepo: PostsRepo) {
    super();
  }

  @UseGuards()
  async run(postUuid: PostUuid): Promise<PostResource> {
    const post = await this.postsRepo.findOneByUuid({ uuid: postUuid }, { findOrThrow: true, relations: { user: true } });
    return new PostResource(post);
  }
}
