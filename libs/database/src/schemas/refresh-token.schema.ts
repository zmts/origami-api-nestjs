import { EntitySchema } from 'typeorm';

import { RefreshToken } from '@libs/entities';

export const RefreshTokenSchema = new EntitySchema<RefreshToken>({
  name: 'RefreshToken',
  target: RefreshToken,
  tableName: 'refresh_tokens',
  columns: {
    id: { type: 'integer', primary: true, generated: true },
    userId: { type: 'integer', name: 'user_id' },
    uuid: { type: 'varchar' },
    ua: { type: 'varchar', nullable: true },
    ip: { type: 'varchar', nullable: true },
    fingerprint: { type: 'varchar', nullable: true },
    expiresIn: { type: 'timestamptz', name: 'expires_in' },
    createdAt: { type: 'timestamptz', createDate: true, name: 'created_at' },
    updatedAt: { type: 'timestamptz', updateDate: true, name: 'updated_at' },
  },
  indices: [
    {
      name: 'IDX_refresh_tokens__user_id',
      columns: ['userId'],
    },
    {
      name: 'IDX_refresh_tokens__uuid',
      columns: ['uuid'],
    },
  ],
  relations: {},
});
