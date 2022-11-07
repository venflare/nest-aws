import { IsEmail, IsString } from 'class-validator';

export class EnqueueEmailDto {
  @IsString()
  userFirstName: string;

  @IsString()
  userLastName: string;

  @IsString()
  userGreetingName: string;

  @IsString()
  emailSubject: string;

  @IsString()
  emailMessage: string;

  @IsEmail()
  emailTo: string;
}
