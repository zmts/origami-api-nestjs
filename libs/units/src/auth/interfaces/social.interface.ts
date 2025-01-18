import { Request } from 'express';

export interface IAuthProfile {
  id: number | string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface ISocialAuthResult<T extends IAuthProfile = IAuthProfile> {
  originalRequest?: Request;
  frontRedirectURL?: string;
  accessToken: string;
  refreshToken: string;
  profile: T & { email: string };
}
