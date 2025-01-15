import { CookieOptions } from 'express';

export class Cookie implements Cookie {
  constructor(props: Cookie) {
    Object.assign(this, { options: {}, ...props });
  }
}

export interface Cookie {
  name: string;
  value: string | number;
  options?: CookieOptions;
}
