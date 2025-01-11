import { Response } from 'express';

import { Cookie } from '../api';

export function setCookie(response: Response, cookies: Cookie[]): void {
  for (const cookie of cookies) {
    response.cookie(cookie.name, cookie.value, cookie.options);
  }
}
