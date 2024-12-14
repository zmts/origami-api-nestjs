import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';

import { AppConfig, AppEnv } from './config.type';
import { validateConfig } from './validate-config';

class EnvironmentVariablesValidator {
  @IsOptional()
  @IsString()
  TEST_ENV: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    env: (process.env.NODE_ENV as AppEnv) || AppEnv.Dev,
    port: parseInt(process.env.APP_PORT as string, 10) || 3000,
    log: { level: (process.env.LOG_LEVEL as any) || 'info' },
  };
});
