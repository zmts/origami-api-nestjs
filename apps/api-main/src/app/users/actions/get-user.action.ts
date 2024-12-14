import { UserResource } from '@api-main/users/inout/resources';
import { Injectable } from '@nestjs/common';

import { BaseAction } from '@libs/common/api';
import { UserUuid } from '@libs/common/types/global';
import { UsersRepo } from '@libs/datalayer/users';

@Injectable()
export class GetUserAction extends BaseAction<[UserUuid], UserResource> {
  constructor(private usersRepo: UsersRepo) {
    super();
  }

  async run(userUuid: UserUuid): Promise<UserResource> {
    const user = await this.usersRepo.findOneByUuid({ uuid: userUuid });
    return new UserResource(user);
  }
}
