import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../../../users/users.service';
import { REFRESH_TOKEN_GUARD_KEY } from '../guards';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  REFRESH_TOKEN_GUARD_KEY,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload) {
    const user = await this.userService.readOne({ id: payload.sub });

    if (!user) {
      throw new UnauthorizedException();
    }

    const match = await bcrypt.compare(
      request.body.refreshToken,
      user.refreshToken,
    );

    if (!match) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
