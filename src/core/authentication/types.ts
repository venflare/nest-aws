import { User } from '../../users/entities';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthenticatedUser {
  user: User;
  tokens: Tokens;
}
