import { Injectable } from '@nestjs/common';

import { BaseAction, ResourceList } from '@libs/common/api';
import { UsersRepo } from '@libs/datalayer/users';

import { UserContract } from '../inout/contracts';
import { UserResource } from '../inout/resources';

@Injectable()
export class ListUsersAction extends BaseAction<[], ResourceList<UserContract>> {
  constructor(private usersRepo: UsersRepo) {
    super();
  }

  async run(): Promise<ResourceList<UserContract>> {
    const users = await this.usersRepo.find({});
    return UserResource.list(users, { pagination: { total: users.length, limit: 100 } });
  }
}
