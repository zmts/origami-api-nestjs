import { Injectable } from '@nestjs/common';

import { CurrentUserJwt } from '@libs/common/auth';
import { BaseAction } from '@libs/core/api';
import { PostsRepo } from '@libs/datalayer/posts';
import { Post } from '@libs/entities';

import { PostResource } from '../inout/resources';
import { CreatePostDto } from '../inout/validations';

@Injectable()
export class CreatePostAction extends BaseAction<[CreatePostDto, CurrentUserJwt], PostResource> {
  constructor(private postsRepo: PostsRepo) {
    super();
  }

  async run(dto: CreatePostDto, currentUser: CurrentUserJwt): Promise<PostResource> {
    const post = await this.postsRepo.save(new Post({ ...dto, userId: currentUser.id }));
    return new PostResource(post);
  }
}
