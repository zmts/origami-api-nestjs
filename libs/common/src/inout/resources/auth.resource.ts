import { Resource } from '@libs/common/api';

import { AuthContract } from '../contracts';

export class AuthResource extends Resource<AuthContract> {
  constructor(private readonly item: { accessToken: string; refreshToken: string }) {
    super();
  }

  result(): AuthContract {
    return {
      ...this.setResult<AuthContract>(this.item, AuthContract),
    };
  }
}
