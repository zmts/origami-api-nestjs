import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import { AppError, ErrorCode } from '@libs/common/errors';
import { AllConfig } from '@libs/config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private config: ConfigService<AllConfig>) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const accessTokenSecret = this.config.get('auth.accessToken.secret', { infer: true });
    const accessToken = this.getAccessToken(request);

    if (!accessToken) {
      throw new AppError(ErrorCode.NO_ANONYMOUS_ACCESS);
    }

    jsonwebtoken.verify(accessToken, accessTokenSecret, (error, decoded) => {
      if (error) {
        throw new AppError(ErrorCode.TOKEN_VERIFY, { message: error.message });
      }
      request.user = decoded;
    });

    return true;
  }

  private getAccessToken(request: Request): string {
    const bearer = request.headers?.authorization || '';
    const [, accessToken] = bearer.split('Bearer ');
    return accessToken || null;
  }
}
