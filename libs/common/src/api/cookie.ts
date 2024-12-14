import { CookieOptions } from 'express';

export class Cookie implements Cookie {
  constructor(props: object) {
    Object.assign(this, props);
  }
}

export interface Cookie {
  name: string;
  value: any;
  options?: CookieOptions;
}
