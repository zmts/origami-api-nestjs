import { EntitySchema } from 'typeorm';

import { User } from '@libs/entities';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    id: { type: 'integer', primary: true, generated: true },
    uuid: { type: 'uuid', generated: 'uuid', unique: true },
    email: { type: 'varchar', nullable: true, unique: true },
    username: { type: 'varchar', nullable: true, unique: true },
    firstname: { type: 'varchar', nullable: true },
    lastname: { type: 'varchar', nullable: true },
    password: { type: 'varchar', nullable: true },
    socialProvider: { name: 'social_provider', type: 'varchar', nullable: true },
    socialId: { name: 'social_id', type: 'varchar', nullable: true },
    bannedAt: { type: 'timestamptz', default: null, name: 'banned_at' },
    lastLoginAt: { type: 'timestamptz', default: null, name: 'last_login_at' },
    createdAt: { type: 'timestamptz', createDate: true, name: 'created_at' },
    updatedAt: { type: 'timestamptz', updateDate: true, name: 'updated_at' },
  },
  indices: [],
  relations: {},
});
