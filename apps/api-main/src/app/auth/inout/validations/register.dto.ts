import { IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(8, 100)
  password: string;
}
