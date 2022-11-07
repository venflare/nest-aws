import { Expose } from 'class-transformer';

export class ReadTokensDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
