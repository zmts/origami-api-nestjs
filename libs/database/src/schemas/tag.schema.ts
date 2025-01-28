import { EntitySchema } from 'typeorm';

import { Tag } from '@libs/entities';

export const TagSchema = new EntitySchema<Tag>({
  name: 'Tag',
  target: Tag,
  tableName: 'tags',
  columns: {
    id: { type: 'integer', primary: true, generated: true },
    slug: { type: 'varchar' },
  },
  indices: [
    {
      name: 'IDX_tags__slug',
      columns: ['slug'],
      unique: true,
    },
  ],
});
