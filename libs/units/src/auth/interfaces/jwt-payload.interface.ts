import { User } from '@libs/entities';

export type JwtPayload = Pick<User, 'uuid'> & {
  exp: number;
};

export type JwtRefreshPayload = {
  uuid: string;
  exp: number;
};
