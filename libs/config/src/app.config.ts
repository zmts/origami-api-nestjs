import { registerAs } from '@nestjs/config';

import { AppConfig, AppEnv } from './config.type';

export default registerAs<AppConfig>('app', () => {
  return {
    env: (process.env.NODE_ENV as AppEnv) || AppEnv.Dev,
    port: parseInt(process.env.APP_PORT as string, 10) || 3000,
    log: { level: (process.env.LOG_LEVEL as any) || 'info' },
  };
});
