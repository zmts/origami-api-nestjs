import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';

import { AuthConfig } from './config.type';
import { validateConfig } from './validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_JWT_SECRET: string;

  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;

  @IsOptional()
  @IsString()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;

  @IsString()
  AUTH_FRONT_REDIRECT_URL: string;

  // Google Auth
  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsString()
  GOOGLE_AUTH_CALLBACK_URL: string;
}

export default registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    accessToken: {
      secret: process.env.AUTH_JWT_SECRET,
      expiresIn: process.env.AUTH_JWT_TOKEN_EXPIRES_IN || '15m',
    },
    refreshToken: {
      cookieName: 'refresh',
      cookiePath: '/refresh',
      expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN || '30d',
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: process.env.GOOGLE_AUTH_CALLBACK_URL,
      frontRedirectURL: process.env.AUTH_FRONT_REDIRECT_URL,
    },
  };
});
