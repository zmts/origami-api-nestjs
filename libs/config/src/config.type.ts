export enum AppEnv {
  Dev = 'development',
  Stage = 'stage',
  Prod = 'production',
}

export interface AppConfig {
  appName: string;
  env: AppEnv;
  port: number;
  frontendUrl: string;
}

export type AuthConfig = {
  accessToken: {
    secret: string;
    expiresIn: string;
  };
  refreshToken: {
    cookieName: string;
    cookiePath: string;
    expiresIn: string;
  };
  google: {
    clientId: string;
    secret: string;
    callbackUrl: string;
    frontRedirectURL: string;
  };
};

export type DatabaseConfig = {
  host: string;
  port: number;
  password: string;
  name: string;
  username: string;
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
