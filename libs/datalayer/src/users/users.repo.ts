import { Injectable } from '@nestjs/common';

import { BaseRepo } from '@libs/common/typeorm';
import { User } from '@libs/entities';

@Injectable()
export class UsersRepo extends BaseRepo<User> {
  protected table = 'users';

  findOneByEmail({ email }: Pick<User, 'email'>): Promise<User | null> {
    if (!email) return null;
    return this.findOne({ email });
  }
}
