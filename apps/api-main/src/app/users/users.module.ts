import { Module } from '@nestjs/common';

import { UsersRepoModule } from '@libs/datalayer/users';

import { GetUserAction, ListUsersAction } from './actions';
import { UsersController } from './users.controller';

@Module({
  imports: [UsersRepoModule],
  controllers: [UsersController],
  providers: [GetUserAction, ListUsersAction],
})
export class UsersModule {}
