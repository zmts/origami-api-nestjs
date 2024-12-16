import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { GOOGLE_AUTH_MODULE_OPTIONS } from './google.module-definition';
import { GoogleAuthModuleOptions, GoogleAuthResult } from './google.types';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(GOOGLE_AUTH_MODULE_OPTIONS) private options: GoogleAuthModuleOptions) {
    super(Object.assign(options, { passReqToCallback: true }) as GoogleAuthModuleOptions);
  }

  async validate(_: any, accessToken: string, refreshToken: string, profile: Profile): Promise<GoogleAuthResult> {
    const defaultEmail = profile._json.email || profile.emails[0]?.value;

    return {
      accessToken,
      refreshToken,
      frontRedirectURL: this.options.frontRedirectURL,
      profile: { email: defaultEmail?.toLowerCase(), ...profile },
    };
  }
}
