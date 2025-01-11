import { Resource } from '@libs/common/api';
import { User } from '@libs/entities';

import { RegisterContract } from '../contracts';

export class RegisterResource extends Resource<RegisterContract> {
  constructor(private readonly item: User) {
    super();
  }

  result(): RegisterContract {
    return {
      ...this.setResult<RegisterContract>(this.item, RegisterContract),
    };
  }
}
