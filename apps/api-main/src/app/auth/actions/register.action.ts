import { Injectable } from '@nestjs/common';

import { BaseAction } from '@libs/core/api';
import { AppError, ErrorCode } from '@libs/core/errors';
import { uuid7 } from '@libs/core/utils';
import { UsersRepo } from '@libs/datalayer/users';
import { User } from '@libs/entities';

import { RegisterDto, RegisterResource } from '../inout';

@Injectable()
export class RegisterAction extends BaseAction<[RegisterDto], RegisterResource> {
  constructor(private readonly usersRepo: UsersRepo) {
    super();
  }

  async run(dto: RegisterDto): Promise<RegisterResource> {
    const user = await this.usersRepo.findOne({ email: dto.password });
    if (user) {
      throw new AppError(ErrorCode.CONFLICT, { entity: User.name });
    }

    await this.usersRepo.save(
      new User({
        ...dto,
        uuid: uuid7(),
        password: await User.hashPassword({ password: dto.password }),
      }),
    );

    return new RegisterResource(new User(dto));
  }
}
