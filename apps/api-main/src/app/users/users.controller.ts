import { GetUserAction, ListUsersAction } from '@api-main/users/actions';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';

import { ResourceList } from '@libs/common/api';

import { UserContract } from './inout/contracts';
import { UserResource } from './inout/resources';

@Controller('users')
export class UsersController {
  constructor(
    private getUserAction: GetUserAction,
    private getListAction: ListUsersAction,
  ) {}

  @Get()
  async getList(): Promise<ResourceList<UserContract>> {
    return this.getListAction.run();
  }

  @Get(':userUuid')
  async getOne(@Param('userUuid', ParseUUIDPipe) userUuid: string): Promise<UserResource> {
    return this.getUserAction.run(userUuid);
  }
}
