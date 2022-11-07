import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { CreatePolicyDto } from '../../policies/dtos';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @ValidateNested()
  @Type(() => CreatePolicyDto)
  @IsOptional()
  @IsArray()
  policies?: CreatePolicyDto[];
}
