import { Injectable } from '@nestjs/common';

import { BaseAction } from '@libs/common/api';
import { AppError, ErrorCode } from '@libs/common/errors';
import { SuccessResource } from '@libs/common/inout';
import { UsersRepo } from '@libs/datalayer/users';
import { User } from '@libs/entities';

import { SendRegisterEmailDto } from '../inout';

@Injectable()
export class SendRegisterEmailAction extends BaseAction<[SendRegisterEmailDto], SuccessResource> {
  constructor(private readonly usersRepo: UsersRepo) {
    super();
  }

  async run(dto: SendRegisterEmailDto): Promise<SuccessResource> {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (user) {
      throw new AppError(ErrorCode.CONFLICT, { entity: User.name });
    }

    return new SuccessResource();
  }
}
