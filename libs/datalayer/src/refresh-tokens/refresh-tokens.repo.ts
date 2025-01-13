import { Injectable } from '@nestjs/common';

import { BaseRepo } from '@libs/common/typeorm';
import { RefreshToken } from '@libs/entities';

@Injectable()
export class RefreshTokensRepo extends BaseRepo<RefreshToken> {
  protected table = 'refresh_tokens';
}
