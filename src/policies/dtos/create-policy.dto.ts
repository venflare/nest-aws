import { IsString } from 'class-validator';

export class CreatePolicyDto {
  @IsString()
  action: string;
}
