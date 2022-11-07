import { AuthGuard } from '@nestjs/passport';

export const REFRESH_TOKEN_GUARD_KEY = 'refresh_token';

export class RefreshTokenGuard extends AuthGuard(REFRESH_TOKEN_GUARD_KEY) {}
