import { IsEmail, Length } from 'class-validator';

export class SendRegisterEmailDto {
  @IsEmail()
  @Length(5, 100)
  email: string;
}
