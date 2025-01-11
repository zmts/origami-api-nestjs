import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthResource, SocialAuthResult } from '@libs/common/auth';
import { SuccessResource } from '@libs/common/inout';
import { GoogleAuthResult, UseGoogleAuth } from '@libs/units/auth-google';

import { LoginEmailAction, LoginGoogleAction, RegisterAction, SendRegisterEmailAction } from './actions';
import { LoginEmailDto, RegisterDto, RegisterResource, SendRegisterEmailDto } from './inout';

@Controller('auth')
export class AuthController {
  constructor(
    private loginEmailAction: LoginEmailAction,
    private loginGoogleAction: LoginGoogleAction,
    private registerAction: RegisterAction,
    private sendRegisterEmailAction: SendRegisterEmailAction,
  ) {}

  @Post('login')
  loginEmail(@Body() dto: LoginEmailDto): Promise<AuthResource> {
    return this.loginEmailAction.run(dto);
  }

  @UseGoogleAuth()
  @Get('login/google')
  async loginOrRegisterWithGoogle(
    @Query('code') code: string,
    @SocialAuthResult() result: GoogleAuthResult,
    @Res() res: Response,
  ): Promise<void | SuccessResource> {
    if (code && result) {
      // const { cookies } = await this.loginGoogleAction.run(result);
      await this.loginGoogleAction.run(result);
      // res.cookie(cookie.name, cookie.value, cookie.options);
      return res.status(HttpStatus.PERMANENT_REDIRECT).redirect(result.frontRedirectURL);
    }
    return new SuccessResource({ success: 'Login with Google' });
  }

  @Post('register-link')
  sendRegisterEmail(@Body() dto: SendRegisterEmailDto): Promise<SuccessResource> {
    return this.sendRegisterEmailAction.run(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<RegisterResource> {
    return this.registerAction.run(dto);
  }
}
