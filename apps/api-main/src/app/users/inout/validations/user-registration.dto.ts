import { IsEmail } from 'class-validator';

export class UserRegistrationDto {
  @IsEmail()
  email: string;
}
