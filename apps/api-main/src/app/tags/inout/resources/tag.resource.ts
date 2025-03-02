import { Resource } from '@libs/core/api';
import { Tag } from '@libs/entities';

import { TagContract } from '../contracts';

export class TagResource extends Resource<TagContract> {
  constructor(private readonly item: Partial<Tag>) {
    super();
  }

  result(): TagContract {
    return this.setResult<TagContract>(this.item, TagContract);
  }
}
