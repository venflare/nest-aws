import { Expose, Type } from 'class-transformer';

import { ReadUserDto } from '../../../users/dtos';
import { ReadTokensDto } from './read-tokens.dto';

export class ReadAuthenticatedUserDto {
  @Type(() => ReadUserDto)
  @Expose()
  user: ReadUserDto;

  @Type(() => ReadTokensDto)
  @Expose()
  tokens: ReadTokensDto;
}
