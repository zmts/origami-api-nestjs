import { IsEmail, IsString, Length } from 'class-validator';

export class LoginEmailDto {
  @IsEmail()
  @Length(8, 100)
  email: string;

  @IsString()
  @Length(8, 100)
  password: string;
}
