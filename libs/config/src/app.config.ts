import { registerAs } from '@nestjs/config';

import { AppConfig, AppEnv } from './config.type';

export default registerAs<AppConfig>('app', () => {
  return {
    appName: process.env.APP_NAME || 'api',
    env: (process.env.NODE_ENV as AppEnv) || AppEnv.Dev,
    port: parseInt(process.env.APP_PORT as string, 10) || 3000,
    frontendUrl: process.env.FRONTEND_URL,
  };
});
