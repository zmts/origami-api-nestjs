import { Profile, StrategyOptions } from 'passport-google-oauth20';

import { ISocialAuthResult } from '@libs/common/auth';

export type GoogleAuthModuleOptions = StrategyOptions & { passReqToCallback?: boolean; frontRedirectURL?: string };

export interface GoogleAuthModuleOptionsFactory {
  createModuleOptions(): Promise<GoogleAuthModuleOptions> | GoogleAuthModuleOptions;
}

export interface GoogleAuthResult extends ISocialAuthResult<Profile> {}
