import { BaseEntity } from './base.entity';

interface ITag {
  id: number;
  slug: string;
}

export interface Tag extends ITag {}

export class Tag extends BaseEntity<Partial<ITag>> {}
