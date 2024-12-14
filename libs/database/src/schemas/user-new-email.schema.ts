import { EntitySchema } from 'typeorm';

import { UserNewEmail } from '@libs/entities';

export const UserNewEmailSchema = new EntitySchema<UserNewEmail>({
  name: 'UserNewEmail',
  target: UserNewEmail,
  tableName: 'user_new_emails',
  columns: {
    id: { type: 'integer', primary: true, generated: true },
    userId: { type: 'integer', name: 'user_id' },
    email: { type: 'varchar', nullable: true, unique: true },
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
