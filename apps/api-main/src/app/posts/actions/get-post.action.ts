import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { BaseAction } from '@libs/common/api';
import { PostUuid } from '@libs/common/types/global';
import { PostsRepo } from '@libs/datalayer/posts';
import { EventType, RabbitQueues } from '@libs/units/rabbitmq';

import { PostResource } from '../inout/resources';

@Injectable()
export class GetPostAction extends BaseAction<[PostUuid], PostResource> {
  constructor(
    private postsRepo: PostsRepo,
    @Inject(RabbitQueues.processor) private readonly processorRMQclient: ClientProxy,
  ) {
    super();
  }

  @UseGuards()
  async run(postUuid: PostUuid): Promise<PostResource> {
    this.processorRMQclient.send(EventType.job, { postUuid });
    const post = await this.postsRepo.findOneByUuid({ uuid: postUuid }, { findOrThrow: true, relations: { user: true } });
    return new PostResource(post);
  }
}
