import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { CurrentUserJwt } from './';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): CurrentUserJwt | null => {
  const request = ctx.switchToHttp().getRequest();
  return request.user ? new CurrentUserJwt(request.user) : null;
});
