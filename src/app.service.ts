import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return `Hello AWS => config service enabled... => ${this.configService.get(
      'ENV_TEST_VERIFICATION_MESSAGE',
    )}`;
  }
}
