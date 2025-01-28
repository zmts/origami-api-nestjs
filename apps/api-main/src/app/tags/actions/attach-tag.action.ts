import { Injectable } from '@nestjs/common';

import { BaseAction } from '@libs/common/api';
import { AppError, ErrorCode } from '@libs/common/errors';
import { PostsRepo } from '@libs/datalayer/posts';
import { TagsRepo } from '@libs/datalayer/tags';
import { Tag } from '@libs/entities';
import { CurrentUserJwt } from '@libs/units/auth';
import { ownerPolicy } from '@libs/units/users';

import { TagResource } from '../inout/resources';
import { AttachTagDto } from '../inout/validations';

@Injectable()
export class AttachTagAction extends BaseAction<[AttachTagDto, CurrentUserJwt], TagResource> {
  constructor(
    private tagsRepo: TagsRepo,
    private postsRepo: PostsRepo,
  ) {
    super();
  }

  async run(dto: AttachTagDto, currentUser: CurrentUserJwt): Promise<TagResource> {
    const post = await this.postsRepo.findOne({ uuid: dto.postUuid }, { relations: { tags: true }, findOrThrow: true });
    ownerPolicy({ currentUserId: currentUser.id, entityUserId: post.userId });
    this.validateTags(post.tags);

    const tag = await this.tagsRepo.findOneOrCreate({ slug: dto.slug });

    post.tags.push(tag);
    await this.postsRepo.save(post);

    return new TagResource(tag);
  }

  private validateTags(tags: Tag[]): void {
    if (tags.length >= 10) {
      throw new AppError(ErrorCode.VALIDATION, { message: 'Tag limit reached. Limit the number of tags to 10' });
    }
  }
}
