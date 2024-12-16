export enum AppEnv {
  Dev = 'development',
  Stage = 'stage',
  Prod = 'production',
}

export interface AppConfig {
  env: AppEnv;
  port: number;
  log: { level: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' };
}

export type AuthConfig = {
  accessToken: {
    secret: string;
    expiresIn: string;
    cookieName?: string;
    cookiePath?: string;
  };
  refreshToken: {
    cookieName?: string;
    cookiePath?: string;
  };
  google: {
    clientId: string;
    secret: string;
    callbackUrl: string;
    frontRedirectURL: string;
  };
};

export type DatabaseConfig = {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  password?: string;
  name?: string;
  username?: string;
  synchronize?: boolean;
  maxConnections: number;
  sslEnabled?: boolean;
  rejectUnauthorized?: boolean;
  ca?: string;
  key?: string;
  cert?: string;
};

export type AllConfig = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
};
