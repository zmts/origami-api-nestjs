import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticateOptionsGoogle } from 'passport-google-oauth20';

const googleAuthenticateOptions = {
  scope: ['profile', 'email'],
  accessType: 'offline',
};

@Injectable()
class GoogleAuthGuard extends AuthGuard('google') {
  constructor(options?: AuthenticateOptionsGoogle) {
    super(Object.assign({}, googleAuthenticateOptions, options));
  }
}

export function UseGoogleAuth(options?: AuthenticateOptionsGoogle): MethodDecorator & ClassDecorator {
  return UseGuards(new GoogleAuthGuard(options));
}
