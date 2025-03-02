import { Module } from '@nestjs/common';

import { RefreshTokensRepoModule } from '@libs/datalayer/refresh-tokens';

import { RefreshTokensService } from './refresh-tokens.service';

@Module({
  providers: [RefreshTokensService],
  exports: [RefreshTokensService],
  imports: [RefreshTokensRepoModule],
})
export class RefreshTokensModule {}
