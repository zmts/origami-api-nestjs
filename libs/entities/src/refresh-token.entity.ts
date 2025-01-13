import ms from 'ms';

import { BaseEntity } from './base.entity';

interface IRefreshToken {
  id: number;
  userId: number;
  uuid: string;
  ua: string;
  ip: string;
  fingerprint: string;
  expiresIn: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefreshToken extends IRefreshToken {}

export class RefreshToken extends BaseEntity<Partial<IRefreshToken>> {
  isValidExpiresIn(): boolean {
    const nowTimeMs = new Date().getTime();
    const expiresInTimeMs = this.expiresIn.getTime();
    return nowTimeMs < expiresInTimeMs;
  }

  setExpiresIn(expiresIn: string): void {
    const intervalMs = ms(expiresIn);
    const nowTimeMs = new Date().getTime();
    const expiresInMs = nowTimeMs + intervalMs;
    this.expiresIn = new Date(expiresInMs);
  }
}
