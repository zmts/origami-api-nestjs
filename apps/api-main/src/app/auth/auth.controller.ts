import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { GetAllCookies } from '@libs/common/api';
import { SuccessResource } from '@libs/common/inout';
import { AllCookies } from '@libs/common/types';
import { SocialAuthResult } from '@libs/units/auth';
import { AuthResource } from '@libs/units/auth/inout/resources';
import { GoogleAuthResult, UseGoogleAuth } from '@libs/units/auth-google';

import { LoginEmailAction, LoginGoogleAction, RefreshAction, RegisterAction, SendRegisterEmailAction } from './actions';
import { LoginEmailDto, RegisterDto, RegisterResource, SendRegisterEmailDto } from './inout';

@Controller('auth')
export class AuthController {
  constructor(
    private loginEmailAction: LoginEmailAction,
    private loginGoogleAction: LoginGoogleAction,
    private refreshAction: RefreshAction,
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
      const resource = await this.loginGoogleAction.run(result);
      const { cookies } = resource.toResponse();
      for (const cookie of cookies) {
        res.cookie(cookie.name, cookie.value, cookie.options);
      }
      return res.status(HttpStatus.PERMANENT_REDIRECT).redirect(result.frontRedirectURL);
    }
    return new SuccessResource({ success: 'Login with Google' });
  }

  @Post('refresh')
  refreshHandler(@GetAllCookies() cookies: AllCookies): Promise<AuthResource> {
    return this.refreshAction.run(cookies);
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
