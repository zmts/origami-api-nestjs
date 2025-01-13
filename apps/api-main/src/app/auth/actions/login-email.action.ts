import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BaseAction } from '@libs/common/api';
import { AuthResource } from '@libs/common/auth';
import { AppError, ErrorCode } from '@libs/common/errors';
import { UsersRepo } from '@libs/datalayer/users';
import { RefreshToken, User } from '@libs/entities';
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

    const accessToken = this.jwtService.sign({ email: user.email, uuid: user.uuid });
    return new AuthResource({ accessToken, refreshToken: refreshToken.uuid });
  }
}
