import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AuthenticationService } from '../authentication.service';
import { LOCAL_GUARD_KEY } from '../guards';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_GUARD_KEY) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    return await this.authenticationService.validate(email, password);
  }
}
