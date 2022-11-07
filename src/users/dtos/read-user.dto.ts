import { Expose, Type } from 'class-transformer';

import { ReadPolicyDto } from '../../policies/dtos';

export class ReadUserDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  verified: boolean;

  @Type(() => ReadPolicyDto)
  @Expose()
  policies?: ReadPolicyDto[];

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
