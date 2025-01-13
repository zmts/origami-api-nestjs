import { Module } from '@nestjs/common';

import { RefreshTokensRepo } from './refresh-tokens.repo';

@Module({
  providers: [RefreshTokensRepo],
  exports: [RefreshTokensRepo],
})
export class RefreshTokensRepoModule {}
