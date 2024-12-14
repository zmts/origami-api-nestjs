import { Module } from '@nestjs/common';

import { UsersRepo } from './users.repo';

@Module({
  providers: [UsersRepo],
  exports: [UsersRepo],
})
export class UsersRepoModule {}
