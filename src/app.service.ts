import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return `Hello AWS All files here => config service enabled... => ${this.configService.get(
      'ENV_TEST_VERIFICATION_MESSAGE',
    )} Listening on port => ${this.configService.get(
      'PORT',
    )} Database host => ${this.configService.get(
      'DB_HOST',
    )} Database username => ${this.configService.get(
      'DB_USERNAME',
    )} Database password => ${this.configService.get(
      'DB_PASSWORD',
    )} Database name => ${this.configService.get('DB_NAME')}`;
  }
}
