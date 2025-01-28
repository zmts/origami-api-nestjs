import { Injectable } from '@nestjs/common';

import { BaseAction } from '@libs/common/api';
import { PostsRepo } from '@libs/datalayer/posts';
import { CurrentUserJwt } from '@libs/units/auth';
import { ownerPolicy } from '@libs/units/users';

import { TagResource } from '../inout/resources';
import { DetachTagDto } from '../inout/validations';

@Injectable()
export class DetachTagAction extends BaseAction<[DetachTagDto, CurrentUserJwt], TagResource> {
  constructor(private postsRepo: PostsRepo) {
    super();
  }

  async run(dto: DetachTagDto, currentUser: CurrentUserJwt): Promise<TagResource> {
    const post = await this.postsRepo.findOne({ uuid: dto.postUuid }, { relations: { tags: true }, findOrThrow: true });
    ownerPolicy({ currentUserId: currentUser.id, entityUserId: post.userId });

    post.tags = post.tags.filter(tag => tag.slug !== dto.slug);
    await this.postsRepo.save(post);

    return new TagResource({ slug: dto.slug });
  }
}
