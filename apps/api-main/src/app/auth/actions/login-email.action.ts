import { Injectable } from '@nestjs/common';

import { BaseAction } from '@libs/common/api';
import { AuthResource } from '@libs/common/inout/resources';

import { LoginEmailDto } from '../inout/validations';

@Injectable()
export class LoginEmailAction extends BaseAction<[LoginEmailDto], AuthResource> {
  constructor() {
    super();
  }

  async run(dto: LoginEmailDto): Promise<AuthResource> {
    return new AuthResource({ accessToken: dto.email, refreshToken: dto.email });
  }
}
