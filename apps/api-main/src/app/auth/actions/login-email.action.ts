import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BaseAction, Cookie } from '@libs/common/api';
import { AppError, ErrorCode } from '@libs/common/errors';
import { UsersRepo } from '@libs/datalayer/users';
import { RefreshToken, User } from '@libs/entities';
import { CurrentUserJwt } from '@libs/units/auth';
import { AuthResource } from '@libs/units/auth/inout/resources';
import { RefreshTokensService } from '@libs/units/refresh-tokens';

import { LoginEmailDto } from '../inout/validations';

@Injectable()
export class LoginEmailAction extends BaseAction<[LoginEmailDto], AuthResource> {
  constructor(
    private jwtService: JwtService,
    private usersRepo: UsersRepo,
    private refreshTokensService: RefreshTokensService,
  ) {
    super();
  }

  async run(dto: LoginEmailDto): Promise<AuthResource> {
    const user = await this.usersRepo.findOneByEmail({ email: dto.email });
    if (!user) {
      throw new AppError(ErrorCode.NOT_FOUND, { entity: User.name });
    }

    const isValidPassword = await User.checkPassword({ password: dto.password, hash: user.password });
    if (!isValidPassword) {
      throw new AppError(ErrorCode.INVALID_CREDENTIALS);
    }

    const refreshToken = await this.refreshTokensService.addRefreshToken(new RefreshToken({ userId: user.id }));
    const accessToken = this.jwtService.sign(new CurrentUserJwt({ id: user.id, uuid: user.uuid, email: user.email }).toJSON());
    return new AuthResource(
      { accessToken, refreshToken: refreshToken.uuid },
      { cookies: [new Cookie({ name: 'refreshToken', value: refreshToken.uuid })] },
    );
  }
}
