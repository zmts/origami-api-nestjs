import { Injectable } from '@nestjs/common';

import { ProcessorAgent } from '@libs/agents/processor/rabbitmq-agent';
import { PostUuid } from '@libs/common/types/global';
import { BaseAction } from '@libs/core/api';
import { PostsRepo } from '@libs/datalayer/posts';

import { PostResource } from '../inout/resources';

@Injectable()
export class GetPostAction extends BaseAction<[PostUuid], PostResource> {
  constructor(
    private postsRepo: PostsRepo,
    private processorAgent: ProcessorAgent,
  ) {
    super();
  }

  async run(postUuid: PostUuid): Promise<PostResource> {
    await this.processorAgent.makeJob({ id: postUuid });
    const post = await this.postsRepo.findOneByUuid({ uuid: postUuid }, { findOrThrow: true, relations: { user: true } });
    return new PostResource(post);
  }
}
