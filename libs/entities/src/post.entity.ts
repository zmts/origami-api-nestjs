import { UserId } from '@libs/common/types/global';
import { uuid } from '@libs/common/utils';
import { Tag, User } from '@libs/entities';

import { BaseEntity } from './base.entity';

interface IPost {
  id: number;
  uuid: string;
  userId: UserId;
  title: string;
  description: string;
  content: object;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post extends IPost {
  user?: User | null;
  tags?: Tag[];
}

export class Post extends BaseEntity<Partial<IPost>> {
  constructor(item: Partial<IPost>) {
    super(item);
    if (!item?.uuid) {
      this.uuid = uuid();
    }
  }
}
