import argon2 from 'argon2';

import { UserId, UserUuid } from '@libs/common/types/global';

import { BaseEntity } from './base.entity';

interface IUser {
  id: UserId;
  uuid: UserUuid;
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  socialId: string | null;
  socialProvider: string | null;
  bannedAt: Date;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends IUser {}
export class User extends BaseEntity<Partial<IUser>> {
  static async hashPassword({ password }: { password: string }): Promise<string> {
    return await argon2.hash(password);
  }

  static async checkPassword({ hash, password }: { hash: string; password: string }): Promise<boolean> {
    if (!password) return false;
    return argon2.verify(hash, password);
  }
}
