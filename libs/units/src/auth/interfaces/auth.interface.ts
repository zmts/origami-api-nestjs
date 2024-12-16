import { User } from '@libs/entities';

export interface AuthToken {
  value: string;
  exp: number;
}

export interface AuthResult {
  accessToken: AuthToken;
  refreshToken: AuthToken;
  user: User | null;
}

export interface RegisterDto {
  email: string;
  password: string;
  inviteCode?: string;
}
