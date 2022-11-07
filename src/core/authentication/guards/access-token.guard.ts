import { AuthGuard } from '@nestjs/passport';

export const ACCESS_TOKEN_GUARD_KEY = 'access_token';

export class AccessTokenGuard extends AuthGuard(ACCESS_TOKEN_GUARD_KEY) {}
