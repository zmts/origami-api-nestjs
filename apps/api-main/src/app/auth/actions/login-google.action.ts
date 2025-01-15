import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BaseAction, Cookie } from '@libs/common/api';
import { AuthResource } from '@libs/common/auth/inout';
import { UsersRepo } from '@libs/datalayer/users';
import { RefreshToken } from '@libs/entities';
import { GoogleAuthResult } from '@libs/units/auth-google';
import { RefreshTokensService } from '@libs/units/refresh-tokens';

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
    const accessToken = this.jwtService.sign({ email: user.email, uuid: user.uuid });
    return new AuthResource(
      { accessToken, refreshToken: refreshToken.uuid },
      { cookies: [new Cookie({ name: 'refreshToken', value: refreshToken.uuid })] },
    );
  }
}
