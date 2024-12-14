import { Resource } from '@libs/common/api';
import { User } from '@libs/entities';

import { UserContract } from '../contracts';

export class UserResource extends Resource<UserContract> {
  constructor(private readonly item: User) {
    super();
  }

  result(): UserContract {
    return {
      ...this.setResult<UserContract>(this.item, UserContract),
    };
  }
}
