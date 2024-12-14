import { UserContract } from '@api-main/users/inout/contracts';
import { UserResource } from '@api-main/users/inout/resources';
import { Injectable } from '@nestjs/common';

import { BaseAction, ResourceList } from '@libs/common/api';
import { UsersRepo } from '@libs/datalayer/users';

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
