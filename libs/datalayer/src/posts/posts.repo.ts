import { Injectable } from '@nestjs/common';

import { BaseRepo } from '@libs/core/typeorm';
import { Post } from '@libs/entities';

@Injectable()
export class PostsRepo extends BaseRepo<Post> {
  protected table = 'posts';
}
