import { Injectable } from '@nestjs/common';

import { BaseRepo } from '@libs/common/typeorm';
import { User } from '@libs/entities';

@Injectable()
export class UsersRepo extends BaseRepo<User> {
  protected table = 'users';
}
