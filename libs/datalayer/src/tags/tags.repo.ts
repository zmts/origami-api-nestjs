import { Injectable } from '@nestjs/common';

import { BaseRepo } from '@libs/common/typeorm';
import { Tag } from '@libs/entities';

@Injectable()
export class TagsRepo extends BaseRepo<Tag> {
  protected table = 'tags';

  async findOneOrCreate({ slug }: { slug: string }): Promise<Tag> {
    let tag = await this.findOne({ slug });
    if (!tag) {
      tag = await this.save(new Tag({ slug }));
    }
    return tag;
  }
}
