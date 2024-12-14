import { User } from '@libs/entities';

import { BaseEntity } from './base.entity';

interface IUserConfirmCode {
  id: number;
  uuid: string;
  code: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserConfirmCode extends IUserConfirmCode {
  user?: User | null;
}

export class UserConfirmCode extends BaseEntity<Partial<IUserConfirmCode>> {}
