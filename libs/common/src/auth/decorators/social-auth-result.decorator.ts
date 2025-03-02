import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ISocialAuthResult } from '../interfaces';

export const SocialAuthResult = createParamDecorator((data: unknown, ctx: ExecutionContext): ISocialAuthResult<any> | null => {
  const request = ctx.switchToHttp().getRequest();
  return request.user ?? null;
});
