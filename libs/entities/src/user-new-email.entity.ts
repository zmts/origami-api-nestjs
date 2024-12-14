import { User } from '@libs/entities';

import { BaseEntity } from './base.entity';

interface IUserNewEmail {
  id: number;
  uuid: string;
  email: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserNewEmail extends IUserNewEmail {
  user?: User | null;
}

export class UserNewEmail extends BaseEntity<Partial<IUserNewEmail>> {}
