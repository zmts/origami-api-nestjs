import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppError, ErrorCode } from '@libs/common/errors';
import { UserId } from '@libs/common/types/global';
import { uuid } from '@libs/common/utils';
import { AllConfig } from '@libs/config';
import { RefreshTokensRepo } from '@libs/datalayer/refresh-tokens';
import { RefreshToken } from '@libs/entities';

const MAX_REFRESH_SESSIONS_COUNT = 5;

@Injectable()
export class RefreshTokensService {
  constructor(
    private readonly refreshTokensRepo: RefreshTokensRepo,
    private configService: ConfigService<AllConfig>,
  ) {}

  async addRefreshToken(refreshToken: RefreshToken): Promise<RefreshToken> {
    const expiresInInterval = this.configService.get('auth.refreshToken.expiresIn', { infer: true });
    const { userId } = refreshToken;
    refreshToken.setExpiresIn(expiresInInterval);

    const isValidCount = await this.isValidSessionsCount({ userId });
    if (isValidCount) {
      return this.addNewRefreshToken(refreshToken);
    }

    await this.wipeAllUserRefreshSessions({ userId });
    return this.addNewRefreshToken(refreshToken);
  }

  validateRefreshToken({ refreshToken, fingerprint }: { refreshToken: RefreshToken; fingerprint?: string }): void | AppError {
    if (!refreshToken.isValidExpiresIn()) {
      throw new AppError(ErrorCode.SESSION_EXPIRED);
    }

    if (refreshToken.fingerprint && refreshToken.fingerprint !== fingerprint) {
      throw new AppError(ErrorCode.INVALID_SESSION);
    }
  }

  private async isValidSessionsCount({ userId }: { userId: UserId }): Promise<boolean> {
    const count = await this.refreshTokensRepo.countBy({ userId });
    return Boolean(count < MAX_REFRESH_SESSIONS_COUNT);
  }

  private async wipeAllUserRefreshSessions({ userId }: { userId: UserId }): Promise<void> {
    await this.refreshTokensRepo.deleteWhere({ userId });
  }

  private async addNewRefreshToken(refreshToken: RefreshToken): Promise<RefreshToken> {
    refreshToken.uuid = uuid();
    const upatedRefreshToken = await this.refreshTokensRepo.save(refreshToken);
    return upatedRefreshToken;
  }
}
