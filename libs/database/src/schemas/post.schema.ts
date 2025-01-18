import { EntitySchema } from 'typeorm';

import { Post } from '@libs/entities';

export const PostSchema = new EntitySchema<Post>({
  name: 'Post',
  target: Post,
  tableName: 'posts',
  columns: {
    id: { type: 'integer', primary: true, generated: true },
    uuid: { type: 'uuid' },
    userId: { type: 'integer', name: 'user_id' },
    title: { type: 'varchar', nullable: true },
    description: { type: 'varchar', nullable: true },
    content: { type: 'json', default: {} },
    isPrivate: { type: 'boolean', name: 'is_private', default: false },
    createdAt: { type: 'timestamptz', createDate: true, name: 'created_at' },
    updatedAt: { type: 'timestamptz', updateDate: true, name: 'updated_at' },
  },
  indices: [
    {
      name: 'IDX_posts__user_id',
      columns: ['userId'],
    },
    {
      name: 'IDX_posts__uuid',
      columns: ['uuid'],
    },
    {
      name: 'IDX_posts__title-description-is_private',
      columns: ['title', 'description', 'isPrivate'],
    },
  ],
  relations: {
    user: {
      type: 'one-to-one',
      target: 'User',
      joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
});
