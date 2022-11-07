import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from '../../users/entities';
import { UsersService } from '../../users/users.service';
import { SignUpDto } from './dtos';
import { AuthenticatedUser, Tokens } from './types';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthenticatedUser> {
    const user = await this.usersService.create(signUpDto);

    const tokens = await this.generateTokens(user.id, user.email);

    await this.usersService.update(
      { id: user.id },
      { refreshToken: tokens.refreshToken },
    );

    return {
      user,
      tokens,
    };
  }

  async signIn(user: User): Promise<AuthenticatedUser> {
    const tokens = await this.generateTokens(user.id, user.email);

    await this.usersService.update(
      { id: user.id },
      { refreshToken: tokens.refreshToken },
    );

    return { user, tokens };
  }

  async signOut(id: number) {
    await this.usersService.update({ id }, { refreshToken: null });
  }

  async refresh(user: User): Promise<AuthenticatedUser> {
    const tokens = await this.generateTokens(user.id, user.email);

    await this.usersService.update(
      { id: user.id },
      { refreshToken: tokens.refreshToken },
    );

    return { user, tokens };
  }

  async generateTokens(id: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.usersService.readOne({ email });

    if (!user) {
      throw new UnauthorizedException(
        "We couldn't find an account with that email and password combination.",
      );
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException(
        "We couldn't find an account with that email and password combination.",
      );
    }

    return user;
  }
}
