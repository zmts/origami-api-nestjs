import { EntitySchema } from 'typeorm';

import { UserResetCode } from '@libs/entities';

export const UserResetCodeSchema = new EntitySchema<UserResetCode>({
  name: 'UserResetCode',
  target: UserResetCode,
  tableName: 'user_reset_codes',
  columns: {
    id: { type: 'integer', primary: true, generated: true },
    userId: { type: 'integer', name: 'user_id' },
    code: { type: 'varchar', nullable: true, unique: true },
    createdAt: { type: 'timestamptz', createDate: true, name: 'created_at' },
    updatedAt: { type: 'timestamptz', updateDate: true, name: 'updated_at' },
  },
  indices: [],
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
