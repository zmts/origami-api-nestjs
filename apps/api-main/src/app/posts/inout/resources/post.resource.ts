import { Resource } from '@libs/core/api';
import { Post } from '@libs/entities';

import { PostContract } from '../contracts';

export class PostResource extends Resource<PostContract> {
  constructor(private readonly item: Post) {
    super();
  }

  result(): PostContract {
    return this.setResult<PostContract>(this.item, PostContract);
  }
}
