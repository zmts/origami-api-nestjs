import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthResource } from '@libs/common/inout/resources';
import { SocialAuthResult } from '@libs/units/auth';
import { GoogleAuthResult, UseGoogleAuth } from '@libs/units/auth-google';

import { LoginEmailAction, LoginGoogleAction } from './actions';
import { LoginEmailDto } from './inout/validations';

@Controller('auth')
export class AuthController {
  constructor(
    private loginEmailAction: LoginEmailAction,
    private loginGoogleAction: LoginGoogleAction,
  ) {}

  @Post('login')
  loginEmail(@Body() dto: LoginEmailDto): Promise<AuthResource> {
    return this.loginEmailAction.run(dto);
  }

  @UseGoogleAuth()
  @Get('google')
  async goGoogleLogin(): Promise<string> {
    return 'Login with Google';
  }

  @UseGoogleAuth()
  @Get('google/callback')
  async googleCallback(@SocialAuthResult() result: GoogleAuthResult, @Res() res: Response): Promise<void> {
    // const { cookies } = await this.loginGoogleAction.run(result);
    await this.loginGoogleAction.run(result);
    // ResponseHelper.CookiesAssign(res, Object.values(cookies));
    return res.status(HttpStatus.PERMANENT_REDIRECT).redirect(result.frontRedirectURL);
  }
}
