import { BaseEntity } from './base.entity';

interface IUser {
  id: number;
  uuid: string;
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
export class User extends BaseEntity<Partial<IUser>> {}
