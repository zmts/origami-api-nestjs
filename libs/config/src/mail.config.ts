import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';

import { MailConfig } from './config.type';
import { validateConfig } from './validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  MAIL_DEFAULT_FROM: string;

  @IsString()
  SENDGRID_API_KEY: string;
}

export default registerAs<MailConfig>('mail', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    defaultFrom: process.env.MAIL_DEFAULT_FROM || 'SuperCompany<no-reply@super.com>',
    sendGridApiKey: process.env.SENDGRID_API_KEY,
  };
});
