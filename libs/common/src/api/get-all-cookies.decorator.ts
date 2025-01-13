import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AllCookies } from '@libs/common/types';

export const GetAllCookies = createParamDecorator((data: unknown, ctx: ExecutionContext): AllCookies => {
  const request = ctx.switchToHttp().getRequest();
  const cookies = request.cookies || {};
  const signedCookies = request.signedCookies || {};
  return { ...cookies, ...signedCookies };
});
