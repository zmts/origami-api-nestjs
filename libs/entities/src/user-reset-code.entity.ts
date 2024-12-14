import { User } from '@libs/entities';

import { BaseEntity } from './base.entity';

interface IUserResetCode {
  id: number;
  uuid: string;
  code: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResetCode extends IUserResetCode {
  user?: User | null;
}

export class UserResetCode extends BaseEntity<Partial<IUserResetCode>> {}
