import { Expose } from 'class-transformer';

export class ReadPolicyDto {
  @Expose()
  id: number;

  @Expose()
  action: string;
}
