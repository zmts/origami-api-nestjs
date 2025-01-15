import { IResponseOptions, Resource } from '@libs/common/api';

import { AuthContract } from '../contracts';

export class AuthResource extends Resource<AuthContract> {
  constructor(
    private readonly item: { accessToken: string; refreshToken: string },
    private readonly opt: IResponseOptions,
  ) {
    super();
  }

  options(): IResponseOptions {
    return this.opt;
  }

  result(): AuthContract {
    return {
      ...this.setResult<AuthContract>(this.item, AuthContract),
    };
  }
}
