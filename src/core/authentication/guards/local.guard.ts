import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const LOCAL_GUARD_KEY = 'local';

@Injectable()
export class LocalGuard extends AuthGuard(LOCAL_GUARD_KEY) {}
