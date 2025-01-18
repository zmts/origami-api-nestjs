import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { BaseAction, Cookie } from '@libs/common/api';
import { ErrorCode, AppError } from '@libs/common/errors';
import { AllCookies } from '@libs/common/types';
import { AllConfig } from '@libs/config';
import { RefreshTokensRepo } from '@libs/datalayer/refresh-tokens';
import { UsersRepo } from '@libs/datalayer/users';
import { RefreshToken } from '@libs/entities';
import { AuthResource } from '@libs/units/auth/inout/resources';
import { RefreshTokensService } from '@libs/units/refresh-tokens';

@Injectable()
export class RefreshAction extends BaseAction<[AllCookies], AuthResource> {
  constructor(
    private jwtService: JwtService,
    private refreshTokensService: RefreshTokensService,
    private refreshTokensRepo: RefreshTokensRepo,
    private usersRepo: UsersRepo,
    private configService: ConfigService<AllConfig>,
  ) {
    super();
  }

  async run(allCookies: AllCookies): Promise<AuthResource> {
    const refreshCookieName = this.configService.get('auth.refreshToken.cookieName', { infer: true });
    const refreshUuid = allCookies[refreshCookieName];

    if (!refreshUuid) throw new AppError(ErrorCode.BAD_REFRESH_TOKEN);

    const { userId } = await this.refreshTokensRepo.findOne({ uuid: refreshUuid }, { findOrThrow: true });
    await this.refreshTokensRepo.deleteWhere({ uuid: refreshUuid });
    const user = await this.usersRepo.findOne({ id: userId }, { findOrThrow: true });

    const refreshToken = await this.refreshTokensService.addRefreshToken(new RefreshToken({ userId }));
    const accessToken = this.jwtService.sign({ uuid: user.uuid });

    return new AuthResource(
      { accessToken, refreshToken: refreshToken.uuid },
      { cookies: [new Cookie({ name: 'refreshToken', value: refreshToken.uuid })] },
    );
  }
}
