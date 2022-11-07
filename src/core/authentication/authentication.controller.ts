import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Serialize } from '../../common/interceptors';
import { User as UserEntity } from '../../users/entities';
import { AuthenticationService } from './authentication.service';
import { User } from './decorators';
import { ReadAuthenticatedUserDto, SignUpDto } from './dtos';
import { AccessTokenGuard, RefreshTokenGuard, LocalGuard } from './guards';

@Controller('api/v1/users/authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Serialize(ReadAuthenticatedUserDto)
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authenticationService.signUp(signUpDto);
  }

  @Serialize(ReadAuthenticatedUserDto)
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@User() user: UserEntity) {
    return await this.authenticationService.signIn(user);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  async signOut(@User('id') id: number) {
    await this.authenticationService.signOut(id);
  }

  @Serialize(ReadAuthenticatedUserDto)
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@User() user: UserEntity) {
    return await this.authenticationService.refresh(user);
  }
}
