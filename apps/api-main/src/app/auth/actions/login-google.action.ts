import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CurrentUserJwt } from '@libs/common/auth';
import { AuthResource } from '@libs/common/auth/inout/resources';
import { GoogleAuthResult } from '@libs/common/auth-google';
import { RefreshTokensService } from '@libs/common/refresh-tokens';
import { BaseAction, Cookie } from '@libs/core/api';
import { UsersRepo } from '@libs/datalayer/users';
import { RefreshToken } from '@libs/entities';

@Injectable()
export class LoginGoogleAction extends BaseAction<[GoogleAuthResult], AuthResource> {
  constructor(
    private jwtService: JwtService,
    private usersRepo: UsersRepo,
    private refreshTokensService: RefreshTokensService,
  ) {
    super();
  }

  async run(authResult: GoogleAuthResult): Promise<AuthResource> {
    const { email, id, provider } = authResult.profile;
    const user = await this.usersRepo.findOrRegister({ email, socialId: id, provider });

    const refreshToken = await this.refreshTokensService.addRefreshToken(new RefreshToken({ userId: user.id }));
    const accessToken = this.jwtService.sign(new CurrentUserJwt({ id: user.id, uuid: user.uuid, email: user.email }).toJSON());
    return new AuthResource(
      { accessToken, refreshToken: refreshToken.uuid },
      { cookies: [new Cookie({ name: 'refreshToken', value: refreshToken.uuid })] },
    );
  }
}
