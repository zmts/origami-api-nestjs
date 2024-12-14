import { Body, Controller, Post } from '@nestjs/common';

import { AuthResource } from '@libs/common/inout/resources';

import { LoginEmailAction } from './actions';
import { LoginEmailDto } from './inout/validations';

@Controller('auth')
export class AuthController {
  constructor(private loginEmailAction: LoginEmailAction) {}

  @Post('login')
  loginEmail(@Body() dto: LoginEmailDto): Promise<AuthResource> {
    return this.loginEmailAction.run(dto);
  }
}
